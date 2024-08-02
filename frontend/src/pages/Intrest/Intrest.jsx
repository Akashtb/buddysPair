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
    <div className="look">
      <h1>Relationship Goals</h1>
      <div className="intrest">
        <Link className="short">Short Term</Link>
        <button onClick={Long} className="short2">
          Long Term
        </button>
      </div>
    </div>
  );
};
export default Intrest;
