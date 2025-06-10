import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff, Square } from "lucide-react";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { axiosHr } from "../../service/axios/axiosHr";
import { toast } from "react-toastify";
import { hrLogin } from "../../service/redux/slices/hrSlice";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

   const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  console.log(data, 'loginData');
  setLoading(true);
  try {
    const response = await axiosHr().post(
      "/login",
      data
    );
    const resData = response.data;

    if (resData.message === 'Success') {
      console.log(resData, 'logindata');
      localStorage.setItem('hrToken', resData.token);
      dispatch(
        hrLogin({
          hr: resData.fullName,
          hrId: resData._id,
          loggedIn: true,
          email: resData.email,
        })
      );
      toast.success('HR Logged in Successfully');
      navigate('/');
    } else if (resData.message === 'Invalid credentials') {
      toast.error('Invalid credentials');
    } else if (resData.message === 'passwordNotMatched') {
      toast.error('Entered password is wrong');
    } else {
      toast.error('HR is not Registered, Please Sign Up!');
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signin-page-container">
      <div className="signin-logo-header">
        <Square className="signin-logo-icon" size={34} />
        <span className="signin-logo-text">LOGO</span>
      </div>
      <div className="signin-main-card">
        <div className="signin-left-panel">
          <img
            src="/assets/signupbg.png"
            alt="Dashboard Screenshot"
            className="signin-dashboard-image"
          />
          <div className="signin-left-text-content">
            <h3 className="signin-left-heading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </h3>
            <p className="signin-left-paragraph">
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            <div className="signin-dots">
              <span className="signin-dot signin-dot-active"></span>
              <span className="signin-dot"></span>
              <span className="signin-dot"></span>
            </div>
          </div>
        </div>
        <div className="signin-right-panel">
          <div className="signin-form-container">
            <h2 className="signin-welcome-heading">Welcome to Dashboard</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
              <div className="signin-form-group">
                <label htmlFor="email" className="signin-label">
                  Email Address<span className="signin-label-star">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className={`signin-input ${
                    errors.email ? "signin-input-error" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="signin-error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="signin-form-group">
                <label htmlFor="password" className="signin-label">
                  Password<span className="signin-label-star">*</span>
                </label>
                <div className="signin-password-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`signin-input ${
                      errors.password ? "signin-input-error" : ""
                    }`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="signin-password-toggle"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="signin-error-message">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="signin-login-button"
                disabled={loading}
              >
                {loading ? "..." : "Login"}
              </button>
            </form>
            <div className="signin-register-link-container">
              Don't have an account?{" "}
              <Link to="/register" className="signin-register-link">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
