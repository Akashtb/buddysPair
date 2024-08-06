import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const insert = (e) => {
    // console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const Onlogin = async () => {
    const response = await axios.post(
      `http://localhost:1400/user/login`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // },
      data
    );

    localStorage.setItem("token", response.data.token);

    console.log("hlooooooooooooooo", response);
    if (response.data.token) {
      navigate(`/choose/${response.data.prof._id}`);
    }
  };

  return (
    <div className="full">
      <h1></h1>

      <div className="login">
        <h3>Login</h3>
        <div className="inputt">
          <label htmlFor="">Username</label>
          <input type="text" name="username" onChange={insert} />
          <br />

          <label htmlFor="">Password</label>
          <input type="text" name="password" onChange={insert} />
        </div>

        <button className="log1" onClick={Onlogin}>
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
