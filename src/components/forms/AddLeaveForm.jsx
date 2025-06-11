"use client"

import { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { X, Upload } from "lucide-react"
import "./candidateform.css"
import { axiosHr } from "../../service/axios/axiosHr"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { formatLeave } from "../../utils/formatLeave"

const addLeaveSchema = yup.object().shape({
  fullName: yup.string().required("Employee name is required"),
  designation: yup.string().required("Designation is required"),
  dateOfLeave: yup.string().required("Date of Leave is required"),
  document: yup
    .mixed()
    .required("Document is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (value && value[0]) {
        return value[0].type === "application/pdf"
      }
      return false
    }),
  reason: yup.string().required("Reason is required"),
})

export default function AddLeaveForm({ onClose }) {
  const modalContentRef = useRef(null)
  const searchDropdownRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const candidates = useSelector((state) => state.candidate.candidates)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(addLeaveSchema),
  })

  const docFile = watch("document")
  const hasDocContent = docFile && docFile[0]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEmployees([])
      setIsSearchDropdownOpen(false)
      return
    }

    const filtered = candidates.filter(
      (employee) =>
        employee.attendance === "Present" &&
        employee.status === 'Selected' &&
        employee.candidateName.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredEmployees(filtered)
    setIsSearchDropdownOpen(filtered.length > 0)
  }, [searchQuery])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setValue("fullName", value)

    if (selectedEmployee && value !== selectedEmployee.candidateName) {
      setSelectedEmployee(null)
      setValue("designation", "")
    }
  }

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee)
    console.log(employee);
    setSearchQuery(employee.candidateName)
    setValue("fullName", employee.candidateName, { shouldValidate: true })
    setValue("designation", employee.position || employee.designation || "", { shouldValidate: true })
    setIsSearchDropdownOpen(false)
    setFilteredEmployees([])
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue("document", e.target.files, { shouldValidate: true })
      trigger("document") 
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose()
      }

      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setIsSearchDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const onSubmit = async (data) => {
    console.log("Add Leave Form Data:", data)
    const formData = new FormData()

    formData.append("fullName", data.fullName)
    formData.append("designation", data.designation)
    formData.append("dateOfLeave", data.dateOfLeave)
    formData.append("document", data.document[0])
    formData.append("reason", data.reason)

    try {
      const response = await axiosHr().post("/addLeave", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Leave added successfully:", response)
      toast.success(response.data.message)
      onClose()
    } catch (error) {
      console.error("Error adding leave:", error)
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to add leave")
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <div className="add-candidate-modal-overlay">
      <div className="add-candidate-modal-content" ref={modalContentRef}>
        <div className="add-candidate-modal-header">
          <div></div>
          <h2 className="add-candidate-modal-title">Add New Leave</h2>
          <button className="add-candidate-modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="add-candidate-form">
          <div className="add-candidate-form-grid">
            <div
              className={`add-candidate-form-group add-candidate-search-group ${errors.fullName ? "add-candidate-input-error-group" : ""}`}
              ref={searchDropdownRef}
            >
              <input
                id="fullName"
                type="text"
                className="add-candidate-input"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="fullName" className="add-candidate-label">
                Search Employee<span className="add-candidate-label-star">*</span>
              </label>

              {/* Search Dropdown */}
              {isSearchDropdownOpen && filteredEmployees.length > 0 && (
                <div className="add-candidate-search-dropdown">
                  {filteredEmployees.map((employee, index) => (
                    <div
                      key={employee.id || employee.emailAddress || index}
                      className="add-candidate-search-option"
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      <div className="add-candidate-search-option-name">{employee.candidateName}</div>
                      <div className="add-candidate-search-option-designation">
                        {employee.position || employee.designation || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {errors.fullName && <p className="add-candidate-error-message">{errors.fullName.message}</p>}
            </div>

            {/* Designation - Auto-filled when employee is selected */}
            <div className={`add-candidate-form-group ${errors.designation ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="designation"
                type="text"
                className="add-candidate-input"
                {...register("designation")}
                placeholder=" "
                readOnly={selectedEmployee !== null}
              />
              <label htmlFor="designation" className="add-candidate-label">
                Designation<span className="add-candidate-label-star">*</span>
              </label>
              {errors.designation && <p className="add-candidate-error-message">{errors.designation.message}</p>}
            </div>

            {/* Date of Leave */}
            <div className={`add-candidate-form-group ${errors.dateOfLeave ? "add-candidate-input-error-group" : ""}`}>
              <input id="dateOfLeave" type="date" className="add-candidate-input" {...register("dateOfLeave")} />
              <label htmlFor="dateOfLeave" className="add-candidate-label">
                Date of Leave<span className="add-candidate-label-star">*</span>
              </label>
              {errors.dateOfLeave && <p className="add-candidate-error-message">{errors.dateOfLeave.message}</p>}
            </div>

            {/* Document Upload */}
            <div
              className={`add-candidate-form-group add-candidate-file-group ${errors.document ? "add-candidate-input-error-group" : ""} ${hasDocContent ? "has-content" : ""}`}
            >
              <input
                id="document"
                type="file"
                accept=".pdf"
                className="add-candidate-file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="document" className="add-candidate-label">
                Document<span className="add-candidate-label-star">*</span>
              </label>
              <div className="add-candidate-file-display">
                <span className="add-candidate-file-name">{docFile && docFile[0] ? docFile[0].name : ""}</span>
                <Upload size={20} className="add-candidate-upload-icon" />
              </div>
              {errors.document && <p className="add-candidate-error-message">{errors.document.message}</p>}
            </div>

            {/* Reason */}
            <div className={`add-candidate-form-group ${errors.reason ? "add-candidate-input-error-group" : ""}`}>
              <input id="reason" type="text" className="add-candidate-input" {...register("reason")} placeholder=" " />
              <label htmlFor="reason" className="add-candidate-label">
                Reason<span className="add-candidate-label-star">*</span>
              </label>
              {errors.reason && <p className="add-candidate-error-message">{errors.reason.message}</p>}
            </div>
          </div>

          <button type="submit" className="add-candidate-save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
