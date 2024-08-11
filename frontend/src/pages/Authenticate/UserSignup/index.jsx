import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./usersignup.css";

const SignUp = () => {
  const [show, setOt] = useState("");
  const [showReg, setReg] = useState([]);
  const navigate = useNavigate();
  // const [res, setRes] = useState();
  const [cred, setCred] = useState({
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const onRegchange = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value });
  };

  const OnReg = async () => {
    setReg("");
    setOt("");
    if (cred.name == "") {
      return setReg("Please enter your name");
    } else if (cred.username == "") {
      return setOt("please enter username");
    } else {
      const response = await axios.post(
        `http://localhost:1400/user/signup`,
        cred
      );
      console.log(response.data);

      console.log(response.data.detail._id);
      navigate(`/registration/${response.data.detail._id}`);
    }
  };

  return (
    <div className="anoop3">
      <div className="data">
        <h3>Sign up</h3>
        <div className="insert">
          <label htmlFor="">
            Name <input type="text" name="name" onChange={onRegchange} />
            <span style={{ color: "red" }}>{showReg}</span>
          </label>
          <label htmlFor="">
            Username{" "}
            <input type="text" name="username" onChange={onRegchange} />
            <span style={{ color: "red" }}>{show}</span>
          </label>

          <label htmlFor="">
            Password{" "}
            <input type="password" name="password" onChange={onRegchange} />
          </label>

          <label htmlFor="">
            ConfirmPassword{" "}
            <input
              type="password"
              name="confirmpassword"
              onChange={onRegchange}
            />
          </label>

          <label htmlFor="">
            Mobile <input lang="en-US" type="number" />
          </label>

          <div className="footer22">
            <a href="">
              Generate OTP <i class="fa-solid fa-arrows-rotate"></i>
              <i class="fa-regular fa-circle-check"></i>
            </a>

            <label htmlFor="">
              OTP <input type="text" />{" "}
            </label>
            <button className="up" onClick={OnReg}>
              Register
            </button>
            <button className="up2">Social media login</button>
            <p className="p4">
              Allready have an account?
              <a className="a3" href="/login">
                Log In
              </a>{" "}
            </p>
          </div>

          <br />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
