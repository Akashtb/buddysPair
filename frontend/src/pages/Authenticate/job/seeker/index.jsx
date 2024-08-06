import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./seek.css";

const JobSeeker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cred, setCred] = useState({ title: "", expertlevel: "" });
  const [jobb, setJob] = useState({});

  const onjo = async () => {
    const responseee = await axios.get(
      `http://localhost:1400/user/person/register/${id}`
    );
    console.log("loop", responseee);
    setJob(responseee.data);
  };

  const onSeeker = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
      reg: jobb._id,
      user: jobb.user._id,
    });
  };

  const Next2 = async () => {
    const response = await axios.post(
      `http://localhost:1400/user/job/seeker`,
      cred
    );
    console.log(response);
    if (response.data.job) {
      navigate(`/intrest/${response.data.job._id}`);
    } else {
      console.log("invalid data");
    }
  };

  useEffect(() => {
    onjo();
  }, []);
  return (
    <div className="seek12">
      <div className="seek">
        <h3>job Details</h3>
        <div className="seek-input">
          <input
            name="title"
            type="text"
            placeholder="Title"
            onChange={onSeeker}
          />
          <label htmlFor="" className="sel">
            Expertise level
            <select name="expertlevel" id="" disabled={0} onChange={onSeeker}>
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
    </div>
  );
};

export default JobSeeker;
