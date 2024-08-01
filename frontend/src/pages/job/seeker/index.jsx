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
      <h1>Looking for</h1>
      <input type="text" placeholder="Title" name="title" onChange={onSeeker} />
      <select
        name="expertlevel"
        id=""
        placeholder="expertise level"
        onChange={onSeeker}
      >
        <option value="">--select--</option>
        <option value="">Begginer</option>
        <option value="">Intermediate</option>
        <option value="">Expert</option>
      </select>
      <button onClick={Next2}>Submit</button>
    </div>
  );
};

export default JobSeeker;
