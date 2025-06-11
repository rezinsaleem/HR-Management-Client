import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X, ChevronDown } from "lucide-react";
import "./candidateform.css";
import { axiosHr } from "../../service/axios/axiosHr";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { formatCandidates } from "../../utils/formatCandidates";
import { setCandidates } from "../../service/redux/slices/candidateSlice";

const editEmployeeSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  emailAddress: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  position: yup.string().required("Position is required"),
  experience: yup.string().required("Experience is required"),
  dateOfJoining: yup.string().required("Date of Joining is required"),
});

export default function EditEmployeeForm({ onClose, defaultValues }) {
  const modalContentRef = useRef(null);
  const positionDropdownRef = useRef(null);
  const dispatch = useDispatch()

  const [isPositionDropdownOpen, setIsPositionDropdownOpen] = useState(false);
  const [displayPositionValue, setDisplayPositionValue] = useState("Select Position");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editEmployeeSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      for (const key in defaultValues) {
        setValue(key, defaultValues[key]);
        if (key === "position") setDisplayPositionValue(defaultValues[key]);
      }
    }
  }, [defaultValues, setValue]);

  const handlePositionSelect = (option) => {
    setDisplayPositionValue(option);
    setValue("position", option, { shouldValidate: true });
    setIsPositionDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideModal =
        modalContentRef.current && !modalContentRef.current.contains(event.target);
      const clickedOutsideDropdown =
        positionDropdownRef.current && !positionDropdownRef.current.contains(event.target);

      if (clickedOutsideModal && clickedOutsideDropdown) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const onSubmit = async (data) => {
    try {
      await axiosHr().put("/updateEmployee", data);
      const res = await axiosHr().get("/candidates");
      console.log("Employee updated successfully:", data);
      toast.success("Employee updated successfully!");
      const formatted = formatCandidates(res.data);
      dispatch(setCandidates(formatted));
      onClose();
    } catch (error) {
      toast.error("Failed to update employee");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="add-candidate-modal-overlay">
      <div className="add-candidate-modal-content" ref={modalContentRef}>
        <div className="add-candidate-modal-header">
          <div></div>
          <h2 className="add-candidate-modal-title">Edit Employee Details</h2>
          <button className="add-candidate-modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="add-candidate-form">
          <div className="add-candidate-form-grid">
            {/* Full Name */}
            <div className={`add-candidate-form-group ${errors.fullName ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="fullName"
                type="text"
                className="add-candidate-input"
                {...register("fullName")}
                placeholder=" "
              />
              <label htmlFor="fullName" className="add-candidate-label">
                Full Name<span className="add-candidate-label-star">*</span>
              </label>
              {errors.fullName && <p className="add-candidate-error-message">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div className={`add-candidate-form-group ${errors.emailAddress ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="emailAddress"
                type="email"
                className="add-candidate-input"
                {...register("emailAddress")}
                placeholder=" "
                readOnly
              />
              <label htmlFor="emailAddress" className="add-candidate-label">
                Email Address<span className="add-candidate-label-star">*</span>
              </label>
              {errors.emailAddress && <p className="add-candidate-error-message">{errors.emailAddress.message}</p>}
            </div>

            {/* Phone Number */}
            <div className={`add-candidate-form-group ${errors.phoneNumber ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="phoneNumber"
                type="text"
                className="add-candidate-input"
                {...register("phoneNumber")}
                placeholder=" "
              />
              <label htmlFor="phoneNumber" className="add-candidate-label">
                Phone Number<span className="add-candidate-label-star">*</span>
              </label>
              {errors.phoneNumber && <p className="add-candidate-error-message">{errors.phoneNumber.message}</p>}
            </div>

            {/* Position Dropdown */}
            <div className={`add-candidate-form-group ${errors.position ? "add-candidate-input-error-group" : ""}`}>
              <div
                className="add-candidate-input add-candidate-custom-dropdown-input"
                tabIndex="0"
                onClick={() => setIsPositionDropdownOpen(!isPositionDropdownOpen)}
                ref={positionDropdownRef}
              >
                <span className={displayPositionValue === "Select Position" ? "add-candidate-placeholder-text" : ""}>
                  {displayPositionValue}
                </span>
                <ChevronDown size={16} className="add-candidate-dropdown-arrow" />
              </div>
              <label htmlFor="position" className="add-candidate-label">
                Position<span className="add-candidate-label-star">*</span>
              </label>
              {isPositionDropdownOpen && (
                <ul className="add-candidate-custom-dropdown-content">
                  {[
                    "Senior Developer",
                    "Human Resource Intern",
                    "Full Time Designer",
                    "Full Time Developer",
                    "Other",
                  ].map((option, index) => (
                    <li
                      key={index}
                      className="add-candidate-custom-dropdown-item"
                      onClick={() => handlePositionSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
              {errors.position && <p className="add-candidate-error-message">{errors.position.message}</p>}
            </div>

            {/* Experience */}
            <div className={`add-candidate-form-group ${errors.experience ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="experience"
                type="text"
                className="add-candidate-input"
                {...register("experience")}
                placeholder=" "
              />
              <label htmlFor="experience" className="add-candidate-label">
                Experience<span className="add-candidate-label-star">*</span>
              </label>
              {errors.experience && <p className="add-candidate-error-message">{errors.experience.message}</p>}
            </div>

            <div className={`add-candidate-form-group ${errors.dateOfJoining ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="dateOfJoining"
                type="date"
                className="add-candidate-input"
                {...register("dateOfJoining")}
              />
              <label htmlFor="dateOfJoining" className="add-candidate-label">
                Date of Joining<span className="add-candidate-label-star">*</span>
              </label>
              {errors.dateOfJoining && <p className="add-candidate-error-message">{errors.dateOfJoining.message}</p>}
            </div>
          </div>

          <button type="submit" className="add-candidate-save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
