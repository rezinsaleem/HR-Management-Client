import CustomDropdown from "../dropdown/CustomDropdown";
import { MoreVertical, File } from "lucide-react";
import "./table.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosHr } from "../../service/axios/axiosHr";
import { formatCandidates } from "../../utils/formatCandidates";
import { setCandidates } from "../../service/redux/slices/candidateSlice";
import { toast } from "react-toastify";
import EditEmployeeForm from "../forms/EditEmployeeForm";
import { setLeaveData } from "../../service/redux/slices/leaveSlice";
import { formatLeaveData } from "../../utils/formatLeave";

export default function Table({
  columns,
  data = [],
  statusOptions = ["New", "Selected", "Rejected"],
  className = "",
}) {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = useSelector((state) => state.candidate.candidates);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    position: "",
  });
  useEffect(() => {
    const handleFilterChange = (event) => {
      setFilters(event.detail);
    };

    document.addEventListener("filterChange", handleFilterChange);

    return () => {
      document.removeEventListener("filterChange", handleFilterChange);
    };
  }, []);
  const filteredData = data.filter((row) => {
    const searchMatch =
      filters.search === "" ||
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(filters.search.toLowerCase())
      );

    const statusMatch =
      filters.status === "" ||
      (row.status && row.status === filters.status) ||
      (row.attendance && row.attendance === filters.status);

    const positionMatch =
      filters.position === "" ||
      (row.position &&
        row.position.toLowerCase().includes(filters.position.toLowerCase()));

    return searchMatch && statusMatch && positionMatch;
  });
  console.log(filteredData, "its from table");

  const handleStatusChange = async (emailAddress, newStatus) => {
    try {
      await axiosHr().put(`/updateCandidateStatus`, {
        emailAddress,
        status: newStatus,
      });
      const res = await axiosHr().get("/candidates");
      const formatted = formatCandidates(res.data);
      dispatch(setCandidates(formatted));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };
  const handleLeaveStatusChange = async (fullName, newStatus) => {
    try {
      await axiosHr().put(`/updateLeaveStatus`, {
        fullName,
        status: newStatus,
      });
      const res = await axiosHr().get("/leave");
      const formatedLeaveData = formatLeaveData(res.data);
      console.log("formatleave data fome tabele", formatedLeaveData);
      dispatch(setLeaveData(formatedLeaveData));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleAttendanceChange = async (emailAddress, newStatus) => {
    try {
      await axiosHr().put(`/updateAttendance`, {
        emailAddress,
        attendance: newStatus,
      });
      const res = await axiosHr().get("/candidates");
      const formatted = formatCandidates(res.data);
      dispatch(setCandidates(formatted));
      toast.success(`Attendance updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating Attendance:", error);
      toast.error("Failed to update Attendance");
    }
  };

  const deleteData = async (emailAddress) => {
    try {
      await axiosHr().delete(`/deleteCandidate/${emailAddress}`);
      console.log('rrrrrrrrrrrrrrrrrrrrrrrr')
      const res = await axiosHr().get("/candidates");
      toast.success("Candidate deleted successfully");
      const formatted = formatCandidates(res.data);
      dispatch(setCandidates(formatted));
    } catch (error) {
      toast.error("Failed to delete candidate");
      console.error("Failed to delete candidate:", error);
    }
  };

  const handleAction = (rowData, action) => {
    const email = rowData.emailAddress;
    const fullEmployeeData = employees.find(
      (emp) => emp.emailAddress === email
    );
    if (action === "Edit") {
      if (fullEmployeeData) {
        setSelectedEmployee(fullEmployeeData);
        console.log("Selected Employee Data:", fullEmployeeData);
        setShowEditModal(true);
      } else {
        toast.error("Employee not found in store.");
      }
    } else if (action === "Delete" || action === 'Delete Candidate') {
      if (
        window.confirm(
          `Are you sure you want to delete ${rowData.employeeName}?`
        )
      ) {
        deleteData(email);
      }
    } else if (action === "Download Resume") {
      if (rowData.resume) {
        window.open(
          `https://hr-management-server-5cqc.onrender.com/uploads/${rowData.resume}`,
          "_blank"
        );
      } else {
        toast.info("No resume found for this candidate.");
      }
    }
  };

  return (
    <div className={`${className}-container`}>
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
                      onSelect={(newStatus) => {
                        row.emailAddress
                          ? handleStatusChange(row.emailAddress, newStatus)
                          : handleLeaveStatusChange(row.fullName, newStatus);
                      }}
                      buttonClassName={`table-status-button table-status-${
                        row[col.key]?.toLowerCase?.() || "unknown"
                      }`}
                    />
                  ) : col.key === "action" ? (
                    <CustomDropdown
                      type="icon"
                      icon={MoreVertical}
                      options={row[col.key]}
                      onSelect={(action) => handleAction(row, action)}
                      contentClassName="table-action-dropdown-content"
                    />
                  ) : col.key === "profileImage" ? (
                    <img
                      src={row[col.key] || "/placeholder.svg"}
                      alt={`${row.employeeName}'s profile`}
                      className="table-profile-image"
                    />
                  ) : col.key === "doc" ? (
                    <File
                      onClick={() => {
                        if (row.doc) {
                          window.open(
                            `https://hr-management-server-5cqc.onrender.com/uploads/${row.doc}`,
                            "_blank"
                          );
                        } else {
                          toast.info("No resume found for this candidate.");
                        }
                      }}
                      size={18}
                    />
                  ) : col.key === "attendance" ? (
                    <CustomDropdown
                      label={row[col.key]}
                      options={statusOptions}
                      onSelect={(newStatus) =>
                        handleAttendanceChange(row.emailAddress, newStatus)
                      }
                      buttonClassName={`table-status-button table-status-${
                        row[col.key]?.toLowerCase?.() || "unknown"
                      }`}
                    />
                  ) : row[col.key] === undefined ? (
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
      {showEditModal && (
        <EditEmployeeForm
          onClose={() => setShowEditModal(false)}
          defaultValues={{
            fullName: selectedEmployee?.candidateName || "",
            emailAddress: selectedEmployee?.emailAddress || "",
            phoneNumber: selectedEmployee?.phoneNumber || "",
            position: selectedEmployee?.position || "",
            experience: selectedEmployee?.experience || "",
            dateOfJoining: selectedEmployee?.dateOfJoining || "",
          }}
        />
      )}
    </div>
  );
}
