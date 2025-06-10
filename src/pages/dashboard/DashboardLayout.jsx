
import { useState, useEffect } from "react" 

import "./dashboard.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Header from "../../components/header/Header"
import Table from "../../components/table/Table"

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
          action: "",
        },
        {
          srNo: "02",
          candidateName: "Guy Hawkins",
          emailAddress: "kenzi.lawson@example.com",
          phoneNumber: "(907) 555-0101",
          position: "Human Resource I...",
          status: "New",
          experience: "1+",
          action: "",
        },
        {
          srNo: "03",
          candidateName: "Arlene McCoy",
          emailAddress: "arlene.mccoy@example.com",
          phoneNumber: "(302) 555-0107",
          position: "Full Time Designer",
          status: "Selected",
          experience: "1+",
          action: "",
        },
        {
          srNo: "04",
          candidateName: "Leslie Alexander",
          emailAddress: "willie.jennings@example.com",
          phoneNumber: "(207) 555-0119",
          position: "Full Time Developer",
          status: "Rejected",
          experience: "0",
          action: "",
        },
      ],
    },
    Employees: {
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Employee Name" },
        { key: "department", label: "Department" },
        { key: "hireDate", label: "Hire Date" },
        { key: "status", label: "Status" },
        { key: "action", label: "Action" },
      ],
      data: [
        {
          id: "E001",
          name: "John Doe",
          department: "Engineering",
          hireDate: "2020-01-15",
          status: "Active",
          action: "",
        },
        { id: "E002", name: "Jane Smith", department: "HR", hireDate: "2019-03-20", status: "On Leave", action: "" },
        {
          id: "E003",
          name: "Peter Jones",
          department: "Marketing",
          hireDate: "2021-07-01",
          status: "Active",
          action: "",
        },
      ],
    },
    Attendance: {
      columns: [
        { key: "date", label: "Date" },
        { key: "employee", label: "Employee" },
        { key: "status", label: "Status" },
        { key: "checkIn", label: "Check-in" },
        { key: "checkOut", label: "Check-out" },
      ],
      data: [
        { date: "2024-06-01", employee: "John Doe", status: "Present", checkIn: "09:00 AM", checkOut: "05:00 PM" },
        { date: "2024-06-01", employee: "Jane Smith", status: "Absent", checkIn: "-", checkOut: "-" },
      ],
    },
    Leaves: {
      columns: [
        { key: "employee", label: "Employee" },
        { key: "type", label: "Leave Type" },
        { key: "startDate", label: "Start Date" },
        { key: "endDate", label: "End Date" },
        { key: "status", label: "Status" },
      ],
      data: [
        {
          employee: "Jane Smith",
          type: "Sick Leave",
          startDate: "2024-06-05",
          endDate: "2024-06-07",
          status: "Approved",
        },
        {
          employee: "Peter Jones",
          type: "Casual Leave",
          startDate: "2024-06-10",
          endDate: "2024-06-10",
          status: "Pending",
        },
      ],
    },
    Logout: {
      columns: [{ key: "message", label: "Message" }],
      data: [{ message: "Please log out to view this content." }],
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
        <Header />
        <div className="dashboard-content-wrapper">
          <Table columns={currentTable.columns} data={currentTable.data} />

        </div>
      </main>
    </div>
  )
}
