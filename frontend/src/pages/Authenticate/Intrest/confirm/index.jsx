import "../intrest.css";
import { useNavigate, useParams } from "react-router-dom";

const Confirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const Yes = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="anoop11">
      <div className="intrest2">
        <h3>Intrested</h3>
        <button onClick={Yes} className="short">
          Matrimony
        </button>
        <button>Dating</button>
      </div>
    </div>
  );
};
export default Confirm;
