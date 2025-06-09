import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Sidebar from "./components/sidebar/Sidebar";
import 'react-toastify/dist/ReactToastify.css'; 
import { useSelector } from "react-redux";

function App() {

 const hr = useSelector((store) => store.hr.loggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={hr ?  <Sidebar/>: <Navigate to="/register" />}  />
        <Route path="/register" element={hr ? <Navigate to="/" />:<SignUp/> } />
        <Route path="/login" element={hr ? <Navigate to="/" />:<SignIn/> } />
        <Route path="/dashboard" element={<Sidebar/>} />
      </Routes>
    </Router>
  )
}

export default App
