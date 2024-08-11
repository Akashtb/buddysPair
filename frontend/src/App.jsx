import "./App.css";
import { Routes, Route } from "react-router-dom";
import Front from "./pages/Authenticate/front/index.jsx";
import Intrest from "./pages/Authenticate/Intrest/index.jsx";
import Confirm from "./pages/Authenticate/Intrest/confirm/index.jsx";
import Job from "./pages/Authenticate/job/index.jsx";
import JobSeeker from "./pages/Authenticate/job/seeker/index.jsx";
import Employe from "./pages/Authenticate/job/Employe/index.jsx";
import Other from "./pages/Authenticate/OtherProfile/index.jsx";
import Payment from "./pages/Authenticate/Payment/index.jsx";
import Payment2 from "./pages/Authenticate/Payment2/index.jsx";
import Profile from "./pages/Authenticate/Profilecreation/index.jsx";
import Registration from "./pages/Authenticate/Registration/index.jsx";
import Login from "./pages/Authenticate/UserLogin/index.jsx";
import SignUp from "./pages/Authenticate/UserSignup/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Front />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign" element={<SignUp />}></Route>
      <Route path="/registration/:id" element={<Registration />}></Route>
      <Route path="/profile/:id" element={<Profile />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/payment2" element={<Payment2 />}></Route>
      <Route path="/other" element={<Other />}></Route>
      <Route path="job/employe/:id" element={<Employe />}></Route>
      <Route path="job/seeker/:id" element={<JobSeeker />}></Route>
      <Route path="/job/:id" element={<Job />}></Route>
      <Route path="/confirm/:id" element={<Confirm />}></Route>
      <Route path="/intrest/:id" element={<Intrest />}></Route>
    </Routes>
  );
}

export default App;
