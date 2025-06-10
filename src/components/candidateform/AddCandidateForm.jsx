
import { useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { X, Upload } from "lucide-react"
import "./candidateform.css" 

const addCandidateSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  emailAddress: yup.string().email("Invalid email address").required("Email address is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  position: yup.string().required("Position is required"),
  experience: yup.string().required("Experience is required"),
  resume: yup
    .mixed()
    .required("Resume is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (value && value[0]) {
        return value[0].type === "application/pdf"
      }
      return false
    }),
  declaration: yup.boolean().oneOf([true], "You must declare the information is true"),
})

export default function AddCandidateForm({ onClose }) {
  const modalContentRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(addCandidateSchema),
  })

  const resumeFile = watch("resume")
  const hasResumeContent = resumeFile && resumeFile[0] 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const onSubmit = (data) => {
    console.log("Add Candidate Form Data:", data)
    alert("Candidate added successfully! Check console for data.")
    onClose()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === "application/pdf") {
      setValue("resume", [file])
      trigger("resume")
    } else {
      setValue("resume", null)
      trigger("resume")
    }
  }

  return (
    <div className="add-candidate-modal-overlay">
      <div className="add-candidate-modal-content" ref={modalContentRef}>
        <div className="add-candidate-modal-header">
          <div></div>
          <h2 className="add-candidate-modal-title">Add New Candidate</h2>
          <button className="add-candidate-modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="add-candidate-form">
          <div className="add-candidate-form-grid">
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

            <div className={`add-candidate-form-group ${errors.emailAddress ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="emailAddress"
                type="email"
                className="add-candidate-input"
                {...register("emailAddress")}
                placeholder=" "
              />
              <label htmlFor="emailAddress" className="add-candidate-label">
                Email Address<span className="add-candidate-label-star">*</span>
              </label>
              {errors.emailAddress && <p className="add-candidate-error-message">{errors.emailAddress.message}</p>}
            </div>

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

            <div className={`add-candidate-form-group ${errors.position ? "add-candidate-input-error-group" : ""}`}>
              <input
                id="position"
                type="text"
                className="add-candidate-input"
                {...register("position")}
                placeholder=" "
              />
              <label htmlFor="position" className="add-candidate-label">
                Position<span className="add-candidate-label-star">*</span>
              </label>
              {errors.position && <p className="add-candidate-error-message">{errors.position.message}</p>}
            </div>

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

            <div
              className={`add-candidate-form-group add-candidate-file-group ${errors.resume ? "add-candidate-input-error-group" : ""} ${hasResumeContent ? "has-content" : ""}`}
            >
              <input
                id="resume"
                type="file"
                accept=".pdf"
                className="add-candidate-file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="resume" className="add-candidate-label">
                Resume<span className="add-candidate-label-star">*</span>
              </label>
              <div className="add-candidate-file-display">
                <span className="add-candidate-file-name">
                  {resumeFile && resumeFile[0] ? resumeFile[0].name : ""}
                </span>
                <Upload size={20} className="add-candidate-upload-icon" />
              </div>
              {errors.resume && <p className="add-candidate-error-message">{errors.resume.message}</p>}
            </div>
          </div>

            <div className="add-candidate-checkbox-group">
            <input
              id="declaration"
              type="checkbox"
              className={`add-candidate-checkbox ${errors.declaration ? "add-candidate-input-error" : ""}`}
              {...register("declaration")}
            />
            <label htmlFor="declaration" className="add-candidate-checkbox-label">
              I hereby declare that the above information is true to the best of my knowledge and belief
            </label>
            {errors.declaration && <p className="add-candidate-error-message">{errors.declaration.message}</p>}
          </div>

          <button type="submit" className="add-candidate-save-button">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
