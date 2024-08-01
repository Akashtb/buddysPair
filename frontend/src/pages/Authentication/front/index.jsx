import { useNavigate } from "react-router-dom";
import "./front.css";

const Front = () => {
  const navigate = useNavigate();

  const phone = () => {
    navigate("/log");
  };
  const Signup = () => {
    navigate("/signup");
  };

  const respos = async () => {
    window.location.href = "http://localhost:1400/pass/login/federated/google";
  };
  return (
    <div className="front">
      <div className="page1">
        <img className="pageImg1" src="\Group.svg" alt="" />

        <div className="pageBtn">
          {/* <div className="H123"></div> */}
          <h1 className="pageH1">
            Let's meeting new <br /> <span className="spa">_</span> people
            around you
          </h1>
          <div className="button1">
            <i class="fa-solid fa-phone-volume"></i>
            <button className="frontbtn" onClick={phone}>
              {" "}
              Login with Phone
            </button>
            <button className="frontbtn1" onClick={respos}>
              Login with Google
            </button>
            <img className="img13" src="\google_13170545.png" alt="" />
            <p className="p12">
              Don't have an account?{" "}
              <a href="" className="a1" onClick={Signup}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
// [FILE: front.js](file "front.js")
