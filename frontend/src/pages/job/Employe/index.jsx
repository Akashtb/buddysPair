// import { useNavigate } from "react-router-dom";
// import Home from "../Home";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./employe.css";

// import { Link } from "react-router-dom";

const Employe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const [jjob, setJob] = useState({});
  const [cred, setCred] = useState({});

  const onjob = async () => {
    const responseee = await axios.get(
      `http://localhost:1400/user/person/register/${id}`
    );
    console.log(responseee);
    setJob(responseee.data);
  };

  const onEmploye = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value, reg: jjob._id, user: jjob.user._id });
  };
  const Next = async () => {
    const response = await axios.post(
      `http://localhost:1400/user/job/employee`,
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
    onjob();
  }, []);
  return (
    <div className="employe">
      <h1>Job Details</h1>
      {/* <button onClick={Employe}>Employee/Employer</button>
      <button onClick={Employe}>Job Seeker</button> */}
      <div className="cont">
        <label htmlFor="">Company name</label>
        <input type="text" name="company" onChange={onEmploye} />
        <br />
        <label htmlFor="">Designation</label>
        <input type="text" name="designation" onChange={onEmploye} />
        <br />
        <label htmlFor="">Location</label>
        <input type="text" name="location" onChange={onEmploye} />
        <br />
      </div>

      <button className="btnemp" onClick={Next}>
        submit
      </button>
    </div>
  );
};
export default Employe;
