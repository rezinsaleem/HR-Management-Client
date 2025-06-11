
import { useState } from "react"
import "./calendar.css"


const LeaveCalendar= () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)) 
  const [selectedDate, setSelectedDate] = useState(8) 

  
  const leavesData= {
    "8": [
      {
        id: "1",
        name: "Cody Fisher",
        role: "Senior Backend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Annual Leave",
      },
      {
        id: "2",
        name: "Jenny Wilson",
        role: "UI/UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Sick Leave",
      },
    ],
    "9": [
      {
        id: "3",
        name: "Robert Fox",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Personal Leave",
      },
    ],
    "15": [
      {
        id: "4",
        name: "Kristin Watson",
        role: "Product Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Annual Leave",
      },
      {
        id: "5",
        name: "Devon Lane",
        role: "QA Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Annual Leave",
      },
      {
        id: "6",
        name: "Marvin McKinney",
        role: "DevOps Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Sick Leave",
      },
    ],
    "22": [
      {
        id: "7",
        name: "Theresa Webb",
        role: "Marketing Specialist",
        avatar: "/placeholder.svg?height=40&width=40",
        leaveType: "Annual Leave",
      },
    ],
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(1) 
  }

  const handleDateClick = (day) => {
    setSelectedDate(day)
  }

  const getSelectedDateLeaves = () => {
    return leavesData[selectedDate.toString()] || []
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="lc-calendar-day lc-calendar-day-empty"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayLeaves = leavesData[day.toString()] || []
      const leaveCount = dayLeaves.length
      const isSelected = day === selectedDate
      const hasLeaves = leaveCount > 0

      days.push(
        <div
          key={day}
          className={`lc-calendar-day ${isSelected ? "lc-calendar-day-selected" : ""} ${hasLeaves ? "lc-calendar-day-has-leaves" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          <span className="lc-calendar-day-number">{day}</span>
          {hasLeaves && (
            <div className="lc-calendar-day-indicator">
              <span className="lc-leave-count">{leaveCount}</span>
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  const selectedLeaves = getSelectedDateLeaves()

  return (
    <div className="lc-container">
      <div className="lc-header">
        <h2 className="lc-title">Leave Calendar</h2>
      </div>

      <div className="lc-calendar">
        <div className="lc-calendar-header">
          <button className="lc-nav-button" onClick={() => navigateMonth("prev")}>
            &#8249;
          </button>
          <h3 className="lc-month-year">
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </h3>
          <button className="lc-nav-button" onClick={() => navigateMonth("next")}>
            &#8250;
          </button>
        </div>

        <div className="lc-calendar-grid">
          <div className="lc-weekdays">
            {daysOfWeek.map((day) => (
              <div key={day} className="lc-weekday">
                {day}
              </div>
            ))}
          </div>
          <div className="lc-calendar-days">{renderCalendarDays()}</div>
        </div>
      </div>

      <div className="lc-approved-leaves">
        <h4 className="lc-approved-leaves-title">
          {selectedLeaves.length > 0
            ? `Leaves on ${selectedDate} ${monthNames[currentDate.getMonth()].slice(0, 3)} (${selectedLeaves.length})`
            : `No leaves on ${selectedDate} ${monthNames[currentDate.getMonth()].slice(0, 3)}`}
        </h4>
        <div className="lc-approved-leaves-list">
          {selectedLeaves.length > 0 ? (
            selectedLeaves.map((leave) => (
              <div key={leave.id} className="lc-approved-leave-item">
                <img src={leave.avatar || "/placeholder.svg"} alt={leave.name} className="lc-avatar" />
                <div className="lc-leave-info">
                  <div className="lc-leave-name">{leave.name}</div>
                  <div className="lc-leave-role">{leave.role}</div>
                </div>
                <div className="lc-leave-type">{leave.leaveType}</div>
              </div>
            ))
          ) : (
            <div className="lc-no-leaves">No approved leaves for this date</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaveCalendar
