import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Home from "../Home";
import "./job.css";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Job = () => {
  const [Num, setNum] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const Jobb = () => {
    console.log(id);
  };

  const Seeker = (No) => {
    console.log(No);
    if (No == 1) {
      setNum(11);
    } else {
      setNum(33);
    }
  };
  const Employe = (check) => {
    console.log("check", check);
    if (check == 33) {
      navigate(`/job/seeker/${id}`);
    } else {
      navigate(`/job/employe/${id}`);
    }
    // navigate(`/job/employe/${id}`);
    //
    // navigate(`/job/seeker/${id}`);
  };

  useEffect(() => {
    Jobb();
  }, []);

  return (
    <div className="anoop12">
      <div className="job">
        <h3>Job Status</h3>

        <label className="main123" htmlFor="">
          <span>
            <input type="checkbox" name="" id="1" onChange={() => Seeker(1)} />
            Employer
          </span>
        </label>
        <label className="main123" htmlFor="">
          <span>
            <input type="checkbox" name="" id="2" onChange={() => Seeker(1)} />
            Employee
          </span>
        </label>
        <label className="main123" htmlFor="">
          <span>
            <input type="checkbox" name="" id="3" onChange={() => Seeker(3)} />
            Job Seeker
          </span>
        </label>
        <button onClick={() => Employe(Num)}>Next</button>
      </div>
    </div>
  );
};
export default Job;
