import "./choose.css";
import { useParams } from "react-router-dom";

const Choose = () => {
  const { id } = useParams;
  const Matrimony = () => {
    window.location.href = `/landing/${id}`;
  };
  const Ecom = () => {
    window.location.href = "/ecom/landing2";
  };

  return (
    <div className="choose">
      <h1>Choose</h1>
      <div className="container">
        <div className="card">
          <h1 className="pick1">Job Portal</h1>
          <h1 className="pick2" onClick={Matrimony}>
            Matrimony
          </h1>
          <h1 className="pick3" onClick={Ecom}>
            E-Commerce
          </h1>
          <h1 className="pick4">Dating</h1>
        </div>
      </div>
    </div>
  );
};

export default Choose;
