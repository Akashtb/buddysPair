import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./reg.css";

const Registration = () => {
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({});

  const [cred, setCred] = useState({
    age: "",
    dob: "",
    hobbies: "",
    intrest: "",
    smoking: "",
    drinking: "",
    qualification: "",
    propic: "",
    mulpleimg: "",
    reel: "",
  });

  const GetUser = async () => {
    const responseee = await axios.get(
      `http://localhost:1450/user/person/${id}`
    );
    console.log("halo", responseee);
    setPerson(responseee.data);
  };

  const onSignup = (e) => {
    const { name, value } = e.target;
    setCred({ ...cred, [name]: value, user: person._id });
  };

  const onData = async () => {
    const response = await axios.post(
      `http://localhost:1450/user/person`,
      cred
    );
    //details =registration
    console.log(response.data);
    if (response.data.details) {
      navigate(`/job/${response.data.details._id}`);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Click the file input element
  };

  useEffect(() => {
    GetUser();
  }, []);

  //

  return (
    <div className="anoop16">
      <div className="box">
        {/* <h1>{person}</h1> */}
        <div className="card1_1_1">
          <h3>Profile Details</h3>
          <div className="card1_1_2">
            <div className="part1">
              <label htmlFor="">
                <input
                  placeholder="Age"
                  type="text"
                  name="age"
                  onChange={onSignup}
                />
              </label>

              <label htmlFor="">
                <input
                  placeholder="dob"
                  type="date"
                  name="date"
                  onChange={onSignup}
                />
              </label>

              <label htmlFor="">
                <input
                  placeholder="Hobbies"
                  type="text"
                  name="hobbies"
                  onChange={onSignup}
                />
              </label>
              <label htmlFor="">
                <input
                  placeholder="Intrest"
                  type="text"
                  name="intrest"
                  onChange={onSignup}
                />
              </label>
              <label htmlFor="">
                <input
                  placeholder="Smoking"
                  type=""
                  name="smoking"
                  onChange={onSignup}
                />
              </label>
            </div>

            <div className="part2">
              <label htmlFor="">
                <input
                  placeholder="Drinking"
                  type=""
                  name="drinking"
                  onChange={onSignup}
                />
              </label>

              <label htmlFor="">
                <input
                  placeholder="Qualification"
                  type="text"
                  name="qualification"
                  onChange={onSignup}
                />
              </label>

              {/* <label htmlFor="">
                <input
                  style={{}}
                  placeholder="Profile Image"
                  type="file"
                  name="propic"
                  onChange={onSignup}
                  className="pp"
                />
              </label> */}
              <div className="koo">
                Profile Image
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <label htmlFor="">
                  <button onClick={handleButtonClick}>
                    <i class="fa-solid fa-image"></i>
                  </button>
                </label>
              </div>

              <div className="koo">
                Add More Image
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <label htmlFor="">
                  <button onClick={handleButtonClick}>
                    <i class="fa-solid fa-image"></i>
                  </button>
                </label>
              </div>

              <div className="koo">
                Add More Image
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <label htmlFor="">
                  <button onClick={handleButtonClick}>
                    <i class="fa-solid fa-video"></i>
                  </button>
                </label>
              </div>
            </div>
          </div>

          <button onClick={onData} className="regbtn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
export default Registration;
