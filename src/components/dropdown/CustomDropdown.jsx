
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import "./dropdown.css" 

export default function CustomDropdown({
  label,
  options,
  onSelect,
  type = "button",
  icon: IconComponent, 
  className,
  buttonClassName,
  contentClassName,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option) => {
    if (onSelect) {
      onSelect(option)
    }
    setIsOpen(false)
  }

  return (
    <div className={`custom-dropdown-wrapper ${className || ""}`} ref={dropdownRef}>
      {type === "button" ? (
        <button className={`custom-dropdown-button ${buttonClassName || ""}`} onClick={() => setIsOpen(!isOpen)}>
          {label} <ChevronDown size={16} />
        </button>
      ) : (
        <button className={`custom-dropdown-icon-button ${buttonClassName || ""}`} onClick={() => setIsOpen(!isOpen)}>
          {IconComponent && <IconComponent size={20} />}
        </button>
      )}

      {isOpen && (
        <ul className={`custom-dropdown-content ${contentClassName || ""}`}>
          {options.map((option, index) => (
            <li key={index} className="custom-dropdown-item" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
