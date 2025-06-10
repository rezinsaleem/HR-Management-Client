import CustomDropdown from "../dropdown/CustomDropdown";
import { MoreVertical } from "lucide-react";
import "./table.css";

export default function Table({ columns, data }) {
  const handleStatusChange = (rowIndex, newStatus) => {
    console.log(`Row ${rowIndex}: Status changed to ${newStatus}`);
  };

  const handleAction = (rowIndex, action) => {
    console.log(`Row ${rowIndex}: Action "${action}" triggered`);
    if (action === "Download Resume") {
      alert(`Downloading resume for row ${rowIndex + 1}`);
    } else if (action === "Delete Candidate") {
      if (window.confirm(`Are you sure you want to delete candidate from row ${rowIndex + 1}?`)) {
        alert(`Deleting candidate from row ${rowIndex + 1}`);
      }
    }
  };

  return (
    <div className="table-container">
      <table className="table-main">
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
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="table-body-row">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`table-body-cell col-${col.key}`}>
                  {col.key === "status" ? (
                    <CustomDropdown
                      label={row[col.key]}
                      options={["New", "Selected", "Interviewing", "Rejected"]}
                      onSelect={(newStatus) => handleStatusChange(rowIndex, newStatus)}
                      buttonClassName={`table-status-button table-status-${row[col.key].toLowerCase()}`}
                    />
                  ) : col.key === "action" ? (
                    <CustomDropdown
                      type="icon"
                      icon={MoreVertical}
                      options={["Download Resume", "Delete Candidate"]}
                      onSelect={(action) => handleAction(rowIndex, action)}
                      contentClassName="table-action-dropdown-content"
                    />
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
