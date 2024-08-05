import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./seek.css";

const JobSeeker = () => {
  const navigate = useNavigate();
  const [cred, setCred] = useState({ title: "", expertlevel: "" });

  const onSeeker = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const Next2 = async () => {
    const response = await axios.post(
      `http://localhost:1400/user/job/seeker`,
      cred
    );
    console.log(response);
    navigate("/intrest");
  };
  return (
    <div className="seek">
      <h3>job Details</h3>
      <div className="seek-input">
        <input type="text" placeholder="Title" onChange={onSeeker} />
        <label htmlFor="" className="sel">
          Expertise level
          <select name="" id="" disabled={0}>
            <option value="" id="0">
              select
            </option>
            <option value=""> Beginner</option>
            <option value=""> Intermdiate</option>
            <option value=""> Expert</option>
          </select>
        </label>
        <button onClick={Next2}>Next</button>
      </div>
    </div>
  );
};

export default JobSeeker;
