
import { useState, useEffect } from "react"

import "./dashboard.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import Table from "../../components/table/Table"
import LeaveCalendar from "../../components/calendar/LeaveCalendar"
import { useDispatch, useSelector } from "react-redux"
import { setCandidates } from "../../service/redux/slices/candidateSlice"
import { axiosHr } from "../../service/axios/axiosHr"
import { formatCandidates } from "../../utils/formatCandidates"
import { formatEmployeesFromCandidates } from "../../utils/formatEmployeesFromCandidates"
import { formatEmployeeAttendance } from "../../utils/formatEmployeeAttendance"
import {  formatLeaveData } from "../../utils/formatLeave"
import { setLeaveData } from "../../service/redux/slices/leaveSlice"
import LogoutForm from "../../components/forms/LogoutForm"

export default function DashboardLayout() {

  const dispatch = useDispatch()
  const candidates = useSelector((state) => state.candidate.candidates)
  const leaveData=useSelector((state)=> state.leave.leaveData)
  console.log(candidates, "candidates from redux store");
  const employees = formatEmployeesFromCandidates(candidates);
  const attendees = formatEmployeeAttendance(candidates);
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const [activeSidebarLink, setActiveSidebarLink] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      return params.get("tab") || "Candidates"
    }
    return "Candidates"
  })

  useEffect(() => {
  const fetchCandidates = async () => {
    try {
      const response = await axiosHr().get("/candidates") 
      const formatted = formatCandidates(response.data)
      dispatch(setCandidates(formatted))
    } catch (error) {
      console.error("Error fetching candidates:", error)
    }
  }

  fetchCandidates()
}, [dispatch])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      if (activeSidebarLink !== params.get("tab")) {
        params.set("tab", activeSidebarLink)
        window.history.pushState(null, "", `?${params.toString()}`)
      }
    }
  }, [activeSidebarLink])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handlePopState = () => {
        const params = new URLSearchParams(window.location.search)
        const tabFromUrl = params.get("tab") || "Candidates"
        if (tabFromUrl !== activeSidebarLink) {
          setActiveSidebarLink(tabFromUrl)
        }
      }

      window.addEventListener("popstate", handlePopState)

      return () => {
        window.removeEventListener("popstate", handlePopState)
      }
    }
  }, [activeSidebarLink])
  useEffect(()=>{

    const fetchData = async()=>{
      const {data} =await axiosHr().get('/leave')
      const formattedDatasLeave= formatLeaveData(data)
      dispatch(setLeaveData(formattedDatasLeave))
    }

    fetchData()


  },[])

  const tableData = {
    Candidates: {
      columns: [
        { key: "srNo", label: "Sr no." },
        { key: "candidateName", label: "Candidates Name" },
        { key: "emailAddress", label: "Email Address" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "position", label: "Position" },
        { key: "status", label: "Status" },
        { key: "experience", label: "Experience" },
        { key: "action", label: "Action" },
      ],
      data: candidates,
    },
    Employees: {
      columns: [
        { key: "profileImage", label: "Profile" },
        { key: "employeeName", label: "Employee Name" },
        { key: "emailAddress", label: "Email Address" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "position", label: "Position" },
        { key: "dateOfJoining", label: "Date of Joining" },
        { key: "action", label: "Action" },
      ],
     data: employees,
    },
    Attendance: {
      columns: [
        { key: "profileImage", label: "Profile" },
        { key: "employeeName", label: "Employee Name" },
        { key: "position", label: "Position" },
        { key: "emailAddress", label: "Email Address" },
        { key: "task", label: "Task" },
        { key: "attendance", label: "Status" },
      ],
      data: attendees,
    },
    Leaves: {
      columns: [
        { key: "profileImage", label: "Profile" },
        { key: "employeeName", label: "Employee Name" },
        { key: "date", label: "Date" },
        { key: "reason", label: "Reason" },
        { key: "status", label: "Status" },
        { key: "doc", label: "Doc" },
      ],
      data: leaveData,
    },
  }

  const dropdownOptions = {
    Candidates: {
      header: {
        status: ["All", "New", "Scheduled", "Ongoing", "Selected", "Rejected"],
        position: ["All", "Developer", "Designer", "Hiring Manager"],
      },
      table: {
        status: ["New", "Scheduled", "Ongoing", "Selected", "Rejected"],
      },
    },
    Employees: {
      header: {
        status: [],
        position: ["All", "Full time","Intern", "Junior", "Senior", "Team Lead"],
      },
      table: {
        status: [],
      },
    },
    Attendance: {
      header: {
        status: ["All", "Present", "Absent", "Medical Leave", "Work From Home"],
        position: [],
      },
      table: {
        status: ["Present", "Absent"],
      },
    },
    Leaves: {
      header: {
        status: ["All", "Approved", "Pending", "Rejected"],
        position: [],
      },
      table: {
        status: ["Approved", "Rejected"],
        action:['doc']
      },
    },
    Logout: {
      header: {
        status: [],
        position: [],
      },
      table: {
        status: [],
      },
    },
  }

  const currentTable = tableData[activeSidebarLink] || { columns: [], data: [] }
  const handleLinkClick = (linkName) => {
    console.log("Setting active link to:", linkName)

    // Handle logout click
    if (linkName === "Logout") {
      setShowLogoutModal(true)
      return // Don't change the active sidebar link for logout
    }

    setActiveSidebarLink(linkName)
  }

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false)
  }


  return (
    <div className="dashboard-layout-container">
      <Sidebar onLinkClick={handleLinkClick} activeLink={activeSidebarLink} />
      <main className="dashboard-main-content">
        <Header
          currentTab={activeSidebarLink}
          statusOptions={dropdownOptions[activeSidebarLink]?.header?.status || []}
          positionOptions={dropdownOptions[activeSidebarLink]?.header?.position || []}
        />
        <div className="dashboard-content-wrapper">
          <Table
            columns={currentTable.columns}
            data={currentTable.data}
            statusOptions={dropdownOptions[activeSidebarLink]?.table?.status || []}
            className={activeSidebarLink === "Leaves" ? "leaves" : "table"}
          />
          {activeSidebarLink === "Leaves" && (
            <LeaveCalendar/>
          )}
        </div>
      </main>
      {showLogoutModal && <LogoutForm onClose={handleCloseLogoutModal} />}
    </div>
  )
}
