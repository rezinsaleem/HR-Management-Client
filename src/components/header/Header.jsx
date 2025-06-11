import { useState, useEffect } from "react"
import { ChevronDown, Search, Mail, Bell } from "lucide-react"
import CustomDropdown from "../dropdown/CustomDropdown"
import AddCandidateForm from "../forms/AddCandidateForm"
import "./header.css"
import AddLeaveForm from "../forms/AddLeaveForm"

export default function Header({ currentTab, statusOptions = [], positionOptions = [] }) {
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [selectedPosition, setSelectedPosition] = useState("Position")
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false)
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setSelectedStatus("Status")
    setSelectedPosition("Position")
    setSearchQuery("")
  }, [currentTab])

  const openAddCandidateModal = () => {
    setIsAddCandidateModalOpen(true)
  }

  const closeAddCandidateModal = () => {
    setIsAddCandidateModalOpen(false)
  }
  const openAddLeaveModal = () => {
    setIsAddLeaveModalOpen(true)
  }

  const closeAddLeaveModal = () => {
    setIsAddLeaveModalOpen(false)
  }

  const handleButtonClick = () => {
    switch (currentTab) {
      case "Leaves":
        openAddLeaveModal()
        break
      case "Candidates":
      default:
        openAddCandidateModal()
        break
    }
  }

  const getButtonText = () => {
    switch (currentTab) {
      case "Leaves":
        return "Add Leave"
      default:
        return "Add Candidate"
    }
  }

  const shouldShowButton = () => {
    return currentTab === "Candidates" || currentTab === "Leaves"
  }

  const shouldShowStatusFilter = () => {
    return currentTab === "Candidates" || currentTab === "Attendance" || currentTab === "Leaves"
  }

  const shouldShowPositionFilter = () => {
    return currentTab === "Candidates" || currentTab === "Employees"
  }

  useEffect(() => {
    const event = new CustomEvent("filterChange", {
      detail: {
        search: searchQuery,
        status: selectedStatus !== "Status" && selectedStatus !== "All" ? selectedStatus : "",
        position: selectedPosition !== "Position" && selectedPosition !== "All" ? selectedPosition : "",
      },
    })

    document.dispatchEvent(event)
  }, [searchQuery, selectedStatus, selectedPosition])

  return (
    <header className="header-container">
      <div className="header-left-section">
        <h1 className="header-title">{currentTab}</h1>
        <div className="header-filters">
          {shouldShowStatusFilter() && (
            <CustomDropdown
              label={selectedStatus}
              options={statusOptions.length > 0 ? statusOptions : ["Status"]}
              onSelect={setSelectedStatus}
              className="header-dropdown-wrapper"
              buttonClassName="header-filter-button"
              contentClassName="header-dropdown-content"
            />
          )}
          {shouldShowPositionFilter() && (
            <CustomDropdown
              label={selectedPosition}
              options={positionOptions.length > 0 ? positionOptions : ["Position"]}
              onSelect={setSelectedPosition}
              className="header-dropdown-wrapper"
              buttonClassName="header-filter-button"
              contentClassName="header-dropdown-content"
            />
          )}
        </div>
      </div>

      <div className="header-right-section">
        <div className="header-icons">
          <div className="header-icon-wrapper">
            <Mail size={24} />
            <span className="header-notification-badge"></span>
          </div>
          <div className="header-icon-wrapper">
            <Bell size={24} />
            <span className="header-notification-badge"></span>
          </div>
          <div className="header-profile-wrapper">
            <img
              src="/assets/userdefault.jpg?height=32&width=32"
              alt="User Profile"
              className="header-profile-picture"
            />
            <ChevronDown size={16} className="header-profile-dropdown-icon" />
          </div>
        </div>
        <div className="header-action-row">
          <div className="header-search-wrapper">
            <Search className="header-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="header-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {shouldShowButton() && (
            <button className="header-add-button" onClick={handleButtonClick}>
              {getButtonText()}
            </button>
          )}
        </div>
      </div>

      {isAddCandidateModalOpen && <AddCandidateForm onClose={closeAddCandidateModal} />}

      {isAddLeaveModalOpen && <AddLeaveForm onClose={closeAddLeaveModal} />}
    </header>
  )
}
