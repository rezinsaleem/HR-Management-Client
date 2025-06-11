
import { useState, useEffect } from "react"

import "./dashboard.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import Table from "../../components/table/Table"
import LeaveCalendar from "../../components/calendar/LeaveCalendar"

export default function DashboardLayout() {
  const [activeSidebarLink, setActiveSidebarLink] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      return params.get("tab") || "Candidates"
    }
    return "Candidates"
  })

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
      data: [
        {
          srNo: "01",
          candidateName: "Jacob William",
          emailAddress: "jacob.william@example.com",
          phoneNumber: "(252) 555-0111",
          position: "Senior Developer",
          status: "New",
          experience: "1+",
          action: ["Download Resume", "Delete Candidate"],
        },
        {
          srNo: "02",
          candidateName: "Guy Hawkins",
          emailAddress: "kenzi.lawson@example.com",
          phoneNumber: "(907) 555-0101",
          position: "Human Resource I...",
          status: "New",
          experience: "1+",
          action: ["Download Resume", "Delete Candidate"],
        },
        {
          srNo: "03",
          candidateName: "Arlene McCoy",
          emailAddress: "arlene.mccoy@example.com",
          phoneNumber: "(302) 555-0107",
          position: "Full Time Designer",
          status: "Selected",
          experience: "1+",
          action: ["Download Resume", "Delete Candidate"],
        },
        {
          srNo: "04",
          candidateName: "Leslie Alexander",
          emailAddress: "willie.jennings@example.com",
          phoneNumber: "(207) 555-0119",
          position: "Full Time Developer",
          status: "Rejected",
          experience: "0",
          action: ["Download Resume", "Delete Candidate"],
        },
      ],
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
      data: [
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Robert Smith",
          emailAddress: "robert.smith@example.com",
          phoneNumber: "(301) 555-6789",
          position: "Frontend Developer",
          dateOfJoining: "2022-04-15",
          action: ["Edit", "Delete"],
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Sarah Johnson",
          emailAddress: "sarah.johnson@example.com",
          phoneNumber: "(406) 555-3412",
          position: "UI/UX Designer",
          dateOfJoining: "2021-11-02",
          action: ["Edit", "Delete"],
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Michael Chen",
          emailAddress: "michael.chen@example.com",
          phoneNumber: "(512) 555-9876",
          position: "Backend Developer Intern",
          dateOfJoining: "2023-01-10",
          action: ["Edit", "Delete"],
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Alicia Rodriguez",
          emailAddress: "alicia.rodriguez@example.com",
          phoneNumber: "(702) 555-4321",
          position: "HR Manager",
          dateOfJoining: "2021-08-22",
          action: ["Edit", "Delete"],
        },
      ],
    },
    Attendance: {
      columns: [
        { key: "profileImage", label: "Profile" },
        { key: "employeeName", label: "Employee Name" },
        { key: "position", label: "Position" },
        { key: "department", label: "Department" },
        { key: "task", label: "Task" },
        { key: "status", label: "Status" },
      ],
      data: [
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Robert Smith",
          position: "Frontend Developer",
          department: "Engineering",
          task: "Homepage redesign",
          status: "Present",
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Sarah Johnson",
          position: "UI/UX Designer",
          department: "Design",
          task: "User research",
          status: "Absent",
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Michael Chen",
          position: "Backend Developer",
          department: "Engineering",
          task: "API development",
          status: "Present",
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Alicia Rodriguez",
          position: "HR Manager",
          department: "Human Resources",
          task: "Recruitment process",
          status: "Present",
        },
      ],
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
      data: [
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Michael Chen",
          date: "2025-01-10",
          reason: "Medical leave",
          status: "Approved",
          doc :''
        },
        {
          profileImage: "/assets/userdefault.jpg?height=40&width=40",
          employeeName: "Alicia Rodriguez",
          date: "2025-01-20",
          reason: "Sick leave",
          status: "Pending",
          doc :''
        },
      ],
    },
    Logout: {
      columns: [{ key: "message", label: "Message" }],
      data: [{ message: "Please log out to view this content." }],
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
    setActiveSidebarLink(linkName)
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
    </div>
  )
}
