import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Home from "../Home";
import "./job.css";
import { useEffect } from "react";
// import { Link } from "react-router-dom";

const Job = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Jobb = () => {
    console.log(id);
  };
  const Employe = () => {
    navigate(`/job/employe/${id}`);
  };
  const Seeker = () => {
    navigate(`/job/seeker/${id}`);
  };
  useEffect(() => {
    Jobb();
  }, []);

  return (
    <div className="job">
      <h1>Job Details</h1>
      <button className="empbtn" onClick={Employe}>
        Employee / Employer
      </button>
      <button className="empbtn" onClick={Seeker}>
        Job Seeker
      </button>
    </div>
  );
};
export default Job;
