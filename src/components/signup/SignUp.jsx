import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Square } from "lucide-react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosHr } from "../../service/axios/axiosHr";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await axiosHr().post(
      "/register",
      data
    );
    toast.success("Registration successful!");
    console.log(response.data);
    navigate("/login");
  } catch (error) {
    console.error(error);
    if (
      error.response &&
      error.response.data &&
      error.response.data.message === "Email already exists"
    ) {
      toast.error("Email already exists");
    } else {
      toast.error("Registration failed.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-page-container">
      <div className="signup-logo-header">
        <Square className="signup-logo-icon" size={34} />
        <span className="signup-logo-text">LOGO</span>
      </div>
      <div className="signup-main-card">
        <div className="signup-left-panel">
          <img
            src="/assets/signupbg.png"
            alt="Dashboard Screenshot"
            className="signup-dashboard-image"
          />
          <div className="signup-left-text-content">
            <h3 className="signup-left-heading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </h3>
            <p className="signup-left-paragraph">
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <div className="signup-dots">
              <span className="signup-dot signup-dot-active"></span>
              <span className="signup-dot"></span>
              <span className="signup-dot"></span>
            </div>
          </div>
        </div>
        <div className="signup-right-panel">
          <div className="signup-form-container">
            <h2 className="signup-welcome-heading">Welcome to Dashboard</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
              <div className="signup-form-group">
                <label htmlFor="fullName" className="signup-label">
                  Full name<span className="signup-label-star">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full name"
                  className={`signup-input ${
                    errors.fullName ? "signup-input-error" : ""
                  }`}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="signup-error-message">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="signup-form-group">
                <label htmlFor="email" className="signup-label">
                  Email Address<span className="signup-label-star">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className={`signup-input ${
                    errors.email ? "signup-input-error" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="signup-error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="signup-form-group">
                <label htmlFor="password" className="signup-label">
                  Password<span className="signup-label-star">*</span>
                </label>
                <div className="signup-password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`signup-input ${
                      errors.password ? "signup-input-error" : ""
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="signup-password-toggle"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="signup-error-message">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="signup-form-group">
                <label htmlFor="confirmPassword" className="signup-label">
                  Confirm Password<span className="signup-label-star">*</span>
                </label>
                <div className="signup-password-input-wrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`signup-input ${
                      errors.confirmPassword ? "signup-input-error" : ""
                    }`}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="signup-password-toggle"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="signup-error-message">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="signup-register-button"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="signup-login-link-container">
              Already have an account?{" "}
              <Link to="/login" className="signup-login-link">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
