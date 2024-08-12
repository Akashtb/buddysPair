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
    console.log("ksssss", response);
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
    <div className="anoop13">
      <div className="employe">
        <h3>Job Details</h3>

        <div className="cont">
          <input
            placeholder="Company Name"
            type="text"
            name="company"
            onChange={onEmploye}
          />

          <input
            placeholder="Designation"
            type="text"
            name="designation"
            onChange={onEmploye}
          />

          <input
            placeholder="Location"
            type="text"
            name="location"
            onChange={onEmploye}
          />
        </div>

        <button className="btnemp" onClick={Next}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Employe;
