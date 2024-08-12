import { useEffect } from "react";
import "./intrest.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const Intrest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const check = () => {
    console.log(id);
  };
  const Long = () => {
    navigate(`/confirm/${id}`);
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <div className="anoop10">
      <div className="look">
        <h3>Relationship Goals</h3>
        <div className="check12">
          <span>
            <input type="checkbox" name="" id="" />
            Short Term Relationship
          </span>
          <span>
            <input type="checkbox" name="" id="" />
            Long Term Relationship
          </span>
        </div>
        <button onClick={Long}>Next</button>
      </div>
    </div>
  );
};
export default Intrest;
