
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
  } = useForm({
    resolver: yupResolver(addCandidateSchema),
  })

  const resumeFile = watch("resume")

  
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
    } else {
      setValue("resume", null) 
      alert("Please upload a PDF file for the resume.")
    }
  }

  return (
    <div className="add-candidate-modal-overlay">
      <div className="add-candidate-modal-content" ref={modalContentRef}>
        {" "}
        <div className="add-candidate-modal-header">
          <h2 className="add-candidate-modal-title">Add New Candidate</h2>
          <button className="add-candidate-modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="add-candidate-form">
          <div className="add-candidate-form-grid">
            <div className="add-candidate-form-group">
              <label htmlFor="fullName" className="add-candidate-label">
                Full Name*
              </label>
              <input
                id="fullName"
                type="text"
                className={`add-candidate-input ${errors.fullName ? "add-candidate-input-error" : ""}`}
                {...register("fullName")}
              />
              {errors.fullName && <p className="add-candidate-error-message">{errors.fullName.message}</p>}
            </div>

            <div className="add-candidate-form-group">
              <label htmlFor="emailAddress" className="add-candidate-label">
                Email Address*
              </label>
              <input
                id="emailAddress"
                type="email"
                className={`add-candidate-input ${errors.emailAddress ? "add-candidate-input-error" : ""}`}
                {...register("emailAddress")}
              />
              {errors.emailAddress && <p className="add-candidate-error-message">{errors.emailAddress.message}</p>}
            </div>

            <div className="add-candidate-form-group">
              <label htmlFor="phoneNumber" className="add-candidate-label">
                Phone Number*
              </label>
              <input
                id="phoneNumber"
                type="text"
                className={`add-candidate-input ${errors.phoneNumber ? "add-candidate-input-error" : ""}`}
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && <p className="add-candidate-error-message">{errors.phoneNumber.message}</p>}
            </div>

            <div className="add-candidate-form-group">
              <label htmlFor="position" className="add-candidate-label">
                Position*
              </label>
              <input
                id="position"
                type="text"
                className={`add-candidate-input ${errors.position ? "add-candidate-input-error" : ""}`}
                {...register("position")}
              />
              {errors.position && <p className="add-candidate-error-message">{errors.position.message}</p>}
            </div>

            <div className="add-candidate-form-group">
              <label htmlFor="experience" className="add-candidate-label">
                Experience*
              </label>
              <input
                id="experience"
                type="text"
                className={`add-candidate-input ${errors.experience ? "add-candidate-input-error" : ""}`}
                {...register("experience")}
              />
              {errors.experience && <p className="add-candidate-error-message">{errors.experience.message}</p>}
            </div>

            <div className="add-candidate-form-group">
              <label htmlFor="resume" className="add-candidate-label">
                Resume*
              </label>
              <div className={`add-candidate-file-input-wrapper ${errors.resume ? "add-candidate-input-error" : ""}`}>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  className="add-candidate-file-input"
                  onChange={handleFileChange}
                />
                <span className="add-candidate-file-name">
                  {resumeFile && resumeFile[0] ? resumeFile[0].name : "Upload PDF"}
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
