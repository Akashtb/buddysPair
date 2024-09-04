import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useContext, useState } from "react";
import IdContext from "../../../context/IdContext";
import { useAuth } from "../../../CustomApi/UseAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [data, setData] = useState(
    {
      email: "",
      password: ""
    }
  );

  const loginData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8003/api/auth/login', data, { withCredentials: true });
      if (response.data.message === "login successful") {
        setAuth(response.data.accessToken)
        navigate('/buddysHomePage');
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      alert('Login failed.');
      console.error('Login error:', error);
    }
  };

  


  return (
    <div className="anoop2">
      <h1></h1>

      <div className="login">
        <h3>Login</h3>
        <div className="inputt">
          <label htmlFor="">email</label>
          <input type="text" name="email" onChange={loginData} />
          <br />

          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={loginData} />
        </div>

        <button className="log1" onClick={handleLogin}>
          Login
        </button>
        <div className="foot">
          <p className="foot1">Forgot password?</p>
          <p className="foot2">
            Don't have an account? {/* <a href="" >signup</a>{" "} */}
            <Link to="/sign" className="a">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
