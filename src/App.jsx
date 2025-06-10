import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import 'react-toastify/dist/ReactToastify.css'; 
import { useSelector } from "react-redux";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

function App() {

 const hr = useSelector((store) => store.hr.loggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={hr ? <DashboardLayout/>: <Navigate to="/register" />}  />
        <Route path="/register" element={hr ? <Navigate to="/" />:<SignUp/> } />
        <Route path="/login" element={hr ? <Navigate to="/" />:<SignIn/> } />
        <Route path="/dashboard" element={<DashboardLayout/>} />
      </Routes>
    </Router>
  )
}

export default App
