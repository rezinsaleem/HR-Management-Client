
import { useState } from "react"
import { ChevronDown, Search, Mail, Bell } from "lucide-react"
import CustomDropdown from '../dropdown/CustomDropdown'
import AddCandidateForm from  '../candidateform/AddCandidateForm'
import "./header.css"

export default function Header() {
  const [selectedStatus, setSelectedStatus] = useState("Status")
  const [selectedPosition, setSelectedPosition] = useState("Position")
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false) 

  const openAddCandidateModal = () => {
    setIsAddCandidateModalOpen(true)
  }

  const closeAddCandidateModal = () => {
    setIsAddCandidateModalOpen(false)
  }

  return (
    <header className="header-container">
      <div className="header-left-section">
        <h1 className="header-title">Candidates</h1>
        <div className="header-filters">
          <CustomDropdown
            label={selectedStatus}
            options={["Active", "Inactive", "Pending", "Interviewing"]}
            onSelect={setSelectedStatus}
            className="header-dropdown-wrapper"
            buttonClassName="header-filter-button"
            contentClassName="header-dropdown-content"
          />
          <CustomDropdown
            label={selectedPosition}
            options={["Developer", "Designer", "Manager", "HR"]}
            onSelect={setSelectedPosition}
            className="header-dropdown-wrapper"
            buttonClassName="header-filter-button"
            contentClassName="header-dropdown-content"
          />
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
            <img src="/assets/userdefault.jpg?height=32&width=32" alt="User Profile" className="header-profile-picture" />
            <ChevronDown size={16} className="header-profile-dropdown-icon" />
          </div>
        </div>
        <div className="header-action-row">
          <div className="header-search-wrapper">
            <Search className="header-search-icon" size={20} />
            <input type="text" placeholder="Search" className="header-search-input" />
          </div>
          <button className="header-add-button" onClick={openAddCandidateModal}>
            Add Candidate
          </button>
        </div>
      </div>

      {isAddCandidateModalOpen && <AddCandidateForm onClose={closeAddCandidateModal} />}
    </header>
  )
}
