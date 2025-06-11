import CustomDropdown from "../dropdown/CustomDropdown"
import { MoreVertical, File } from "lucide-react"
import "./table.css"
import { useState, useEffect } from "react"

export default function Table({ columns, data, statusOptions = ["New", "Selected", "Rejected"],className = '' }) {
  const [tableData, setTableData] = useState(data)

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    position: "",
  })

  useEffect(() => {
    const handleFilterChange = (event) => {
      setFilters(event.detail)
    }

    document.addEventListener("filterChange", handleFilterChange)

    return () => {
      document.removeEventListener("filterChange", handleFilterChange)
    }
  }, [])

  const filteredData = data.filter((row) => {
    const searchMatch =
      filters.search === "" ||
      Object.values(row).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(filters.search.toLowerCase()),
      )

    const statusMatch = filters.status === "" || (row.status && row.status === filters.status)

    const positionMatch =
      filters.position === "" || (row.position && row.position.toLowerCase().includes(filters.position.toLowerCase()))

    return searchMatch && statusMatch && positionMatch
  })

  const handleStatusChange = (rowIndex, newStatus) => {
    console.log(`Row ${rowIndex}: Status changed to ${newStatus}`)
    const updatedData = [...tableData]
    updatedData[rowIndex].status = newStatus
    setTableData(updatedData)
  }

  const handleAction = (rowIndex, action) => {
    console.log(`Row ${rowIndex}: Action "${action}" triggered`)
    if (action === "Download Resume") {
      alert(`Downloading resume for row ${rowIndex + 1}`)
    } else if (action === "Delete Candidate") {
      if (window.confirm(`Are you sure you want to delete candidate from row ${rowIndex + 1}?`)) {
        alert(`Deleting candidate from row ${rowIndex + 1}`)
      }
    }
  }

  return (
    <div className= {`${className}-container`}>
      <table className={`${className}-main`}>
        <thead className="table-header">
          <tr className="table-header-row">
            {columns.map((col, index) => (
              <th key={index} className={`table-header-cell col-${col.key}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-body-row">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`table-body-cell col-${col.key}`}>
                  {col.key === "status" ? (
                    <CustomDropdown
                      label={row[col.key]}
                      options={statusOptions}
                      onSelect={(newStatus) => handleStatusChange(rowIndex, newStatus)}
                      buttonClassName={`table-status-button table-status-${row[col.key].toLowerCase()}`}
                    />
                  ) : col.key === "action" ? (
                    <CustomDropdown
                      type="icon"
                      icon={MoreVertical}
                      options={row[col.key]}
                      onSelect={(action) => handleAction(rowIndex, action)}
                      contentClassName="table-action-dropdown-content"
                    />
                  ) : col.key === "profileImage" ? (
                    <img
                      src={row[col.key] || "/placeholder.svg"}
                      alt={`${row.employeeName}'s profile`}
                      className="table-profile-image"
                    />
                  ) : col.key === "doc" ? (
                   <File size={18}/>
                  ): row[col.key] === undefined ? (
                    "-"
                  ) : (
                    String(row[col.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
