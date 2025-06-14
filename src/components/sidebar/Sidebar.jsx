import { Square, Search, Users, BarChart, Sparkles, LogOut, Menu, X } from 'lucide-react'
import { useState } from "react"
import "./sidebar.css" 

export default function Sidebar({ onLinkClick, activeLink }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    {
      category: "Recruitment",
      links: [{ name: "Candidates", icon: Users }],
    },
    {
      category: "Organization",
      links: [
        { name: "Employees", icon: Users },
        { name: "Attendance", icon: BarChart },
        { name: "Leaves", icon: Sparkles },
      ],
    },
    {
      category: "Others",
      links: [{ name: "Logout", icon: LogOut }],
    },
  ]

  const handleMobileLinkClick = (itemName) => {
    onLinkClick(itemName)
    setIsMobileMenuOpen(false) 
  }

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        className="sidebar-mobile-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar-container ${isMobileMenuOpen ? 'sidebar-mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Square className="sidebar-logo-icon" size={32} />
          <span className="sidebar-logo-text">LOGO</span>
        </div>

        <div className="sidebar-search-wrapper">
          <Search className="sidebar-search-icon" size={20} />
          <input type="text" placeholder="Search" className="sidebar-search-input" />
        </div>

        <nav className="sidebar-navigation">
          {navigationItems.map((categoryGroup, index) => (
            <div key={index} className="sidebar-category-group">
              <h3 className="sidebar-category-label">{categoryGroup.category}</h3>
              <ul className="sidebar-menu">
                {categoryGroup.links.map((item, itemIndex) => (
                  <li key={itemIndex} className="sidebar-menu-item">
                    <a
                      href="#"
                      className={`sidebar-menu-link ${activeLink === item.name ? "sidebar-menu-link-active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleMobileLinkClick(item.name)
                      }}
                    >
                      <item.icon className="sidebar-menu-icon" size={20} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}