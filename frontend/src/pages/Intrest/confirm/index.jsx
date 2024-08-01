import "../intrest.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const Confirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const Yes = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="intrest2">
      <h1>Intrested</h1>
      <button onClick={Yes} className="short">
        yes
      </button>
      <Link className="short2">No</Link>
    </div>
  );
};
export default Confirm;
