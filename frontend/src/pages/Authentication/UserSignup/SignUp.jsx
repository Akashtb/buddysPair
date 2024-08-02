import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./usersignup.css";

const SignUp = () => {
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
    const response = await axios.post(
      `http://localhost:1400/user/signup`,
      cred
    );
    console.log(response.data);
    // if (response.data.detail) {
    // const data = response.data.detail;
    // const { id } = data._id;
    console.log(response.data.detail._id);
    navigate(`/registration/${response.data.detail._id}`);
    // }
  };
  // useEffect(() => {
  //   OnReg();
  // }, []);

  return (
    <div className="usersign">
      <div className="data">
        <h1>SignUp</h1>
        <div className="insert">
          <label htmlFor="">Name</label>
          <input type="text" name="name" onChange={onRegchange} />
          <br />
          <label htmlFor="">Username</label>
          <input type="text" name="username" onChange={onRegchange} />
          <br />
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={onRegchange} />
          <br />
          <label htmlFor="">ConfirmPassword</label>
          <input
            type="password"
            name="confirmpassword"
            onChange={onRegchange}
          />
          <br />
        </div>
        <button className="up" onClick={OnReg}>
          Register
        </button>
        {/* <Link to="/registration">signup</Link> */}

        <button className="up2">Social media login</button>
      </div>
    </div>
  );
};

export default SignUp;

// import React from 'react';
// import axios from 'axios';

// const GoogleLoginButton = ({ onSuccess }) => {
//   const handleLoginClick = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/auth/google');
//       // Handle success or redirect to the returned URL
//       window.location.href = res.data.redirectUrl; // Redirect to the returned URL from backend
//     } catch (error) {
//       console.error('Error logging in with Google:', error);
//     }
//   };

//   return (
//     <button onClick={handleLoginClick}>Login with Google</button>
//   );
// };

// export default GoogleLoginButton;
