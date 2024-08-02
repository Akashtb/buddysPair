import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./reg.css";

const Registration = () => {
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
      `http://localhost:1400/user/person/${id}`
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
      `http://localhost:1400/user/person`,
      cred
    );
    //details =registration
    console.log(response.data);
    if (response.data.details) {
      navigate(`/job/${response.data.details._id}`);
    }
  };
  useEffect(() => {
    GetUser();
  }, []);

  //

  return (
    <div className="reg">
      <div className="box">
        {/* <h1>{person}</h1> */}
        <div className="card1_1_1">
          <h1>Registration</h1>
          <div className="card1_1_2">
            <div className="part1">
              <label htmlFor="">Age</label>
              <input type="text" name="age" onChange={onSignup} />
              <br />
              <label htmlFor="">DOB</label>
              {/* <select name="" id="frame">
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Other</option>
            </select>{" "} */}
              <input type="date" name="date" onChange={onSignup} />
              <br />
              <label htmlFor="">Hobbies</label>
              <input type="text" name="hobbies" onChange={onSignup} /> <br />
              <label htmlFor="">Intrest</label>
              <input type="text" name="intrest" onChange={onSignup} /> <br />
              <label htmlFor="">Smoking Habit</label>
              <input type="" name="smoking" onChange={onSignup} />
            </div>

            <div className="part2">
              <label htmlFor="">Drinking Habit</label>
              <input type="" name="drinking" onChange={onSignup} />
              <br />
              <label htmlFor=""> Qualification</label>
              <input type="text" name="qualification" onChange={onSignup} />
              <br />
              <label htmlFor=""> Profile pic</label>
              <input type="file" name="propic" onChange={onSignup} />
              <br />
              <label htmlFor="">Add more pic </label>
              <input type="file" name="multipepic" onChange={onSignup} />
              <br />
              <label htmlFor=""> Short reel</label>
              <input type="text" name="reel" onChange={onSignup} />
              <br />
            </div>
          </div>{" "}
          {/* <input
            type="radio"
            className="btn-primary"
            name="gender"
            id="male"
            autocomplete="off"
            required
          />
          <label className="" class="btn btn-sm btn-outline-secondary" for="male">
            Male
          </label> */}
          <button onClick={onData} className="regbtn">
            Register
          </button>
          {/* <Link to="/job">----------------------register</Link> */}
        </div>
      </div>
    </div>
  );
};
export default Registration;
