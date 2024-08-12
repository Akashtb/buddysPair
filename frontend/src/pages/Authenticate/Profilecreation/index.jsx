import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  //   const selectElement = document.getElementById("frame");
  //   const selectedValues = getSelectValues(selectElement);
  //   console.log(selectedValues); // Array of selected values
  const { id } = useParams();
  // const { id } = useParams();
  const [use, setUser] = useState({});

  const Getjobb = async () => {
    const getresponseeee = await axios.get(
      `http://localhost:1400/user/job/employee/${id}`
    );
    console.log(getresponseeee);
    setUser(getresponseeee.data);
  };

  const navigate = useNavigate();
  const [cred, setCred] = useState({
    gender: "",
    religion: "",
    horriscope: "",
    motherTongue: "",
    about: "",
    height: "",
    weight: "",
    bodytype: "",
    marrital: "",
    education: "",
    occupation: "",
    income: "",
    passion: "",
    futureplan: "",
    fatherjob: "",
    mothername: "",
    motherjob: "",
    siblngs: "",
    contact: "",
    email: "",
    address: "",
  });
  const onPro = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
      job: use._id,
      reg: use.reg._id,
      user: use.user._id,
    });
  };

  const Next3 = async () => {
    const response = await axios.post(
      `http://localhost:1400/user/profile`,
      cred
    );
    // console.log("hlooooo", response.data.pro._id);
    if (response.data.pro) {
      navigate(`/login`);
    }
  };
  useEffect(() => {
    Getjobb();
  }, []);

  return (
    <div className="anoop15">
      {/* <h1 className="head">Matrimony</h1> */}

      <div className="box12">
        <h3>Additional details</h3>
        <div className="box77">
          <div className="card55">
            <textarea name="" placeholder="About" id=""></textarea>
            <br />{" "}
            <select name="" id="">
              <option value="">Marital Status</option>
              <option value="">married</option>
            </select>
            <br />
            {/* <label htmlFor="">Religion</label> */}
            <input
              placeholder="Annual Income"
              type="text"
              name="religion"
              onChange={onPro}
            />{" "}
            <br />
            {/* <label htmlFor="">Horriscope</label> */}
            <input
              placeholder="Family Type"
              type="text"
              name="horriscope"
              onChange={onPro}
            />{" "}
            <br />
            {/* <label htmlFor="">Marrital status</label> */}
            <input
              placeholder="Father's Name"
              type="text"
              name="marrital"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">About</label> */}
            <input
              placeholder="Father's Occupation"
              name="about"
              id=""
              onChange={onPro}
            ></input>
            <br />
            {/* <label htmlFor="">Height</label> */}
            <input
              placeholder="Mother's Name"
              type="number"
              name="height"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Weight</label> */}
            <input
              placeholder="Mother's Occupation"
              label=""
              type="number"
              name="weight"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Body type</label> */}
            <input
              placeholder="Number of Siblings"
              type="text"
              name="bodytype"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Education</label> */}
          </div>

          <div className="card66">
            <input
              placeholder="Number of Siblings Married"
              type="text"
              name="education"
              onChange={onPro}
            />{" "}
            <br />
            {/* <label htmlFor="">Occupation</label> */}
            <input
              placeholder="Siblings Name & Details"
              type="text"
              name="occupation"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Annual income</label> */}
            <input
              placeholder="Height"
              type="number"
              name="income"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Passion</label> */}
            <input
              placeholder="Weight"
              type="text"
              name="passsion"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Future plans</label> */}
            <input
              placeholder="Body Type"
              type="text"
              name="futureplan"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Father Name</label> */}
            <input
              placeholder="Complexion"
              type="text"
              name="fathername"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Father Occupation</label> */}
            <input
              placeholder="Disabilities"
              type="text"
              name="fatherjob"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Mother Name</label> */}
            <input
              placeholder="Religion"
              type="text"
              name="mothername"
              onChange={onPro}
            />
            <br />
            {/* <label  htmlFor="">Mother Occupation</label> */}
            <input
              placeholder="Cast/Community"
              type="text"
              name="motherjob"
              onChange={onPro}
            />
            <br />
            {/* <label htmlFor="">Siblings</label> */}
            <input
              placeholder="Expectaions from Partner"
              type="text"
              name="siblings"
              onChange={onPro}
            />{" "}
            <br />
            <input
              placeholder="Gender"
              type="text"
              name="gender"
              onChange={onPro}
            />
          </div>
        </div>
        <button className="sub" onClick={Next3}>
          Next
        </button>
      </div>

      {/* <Link to="/landing" className="sub">
        Submit
      </Link> */}

      <footer></footer>
    </div>
  );
};

export default Profile;

{
  /* <h1>lifestyle--eating habit,drinking,smoking,intresting habbit</h1>
          <h1>career information--education,occupation,salary</h1>
          <h1>
            personal details--name,gender,dob,religion,language,state, family
            type,
          </h1>
          <h1>basic information--height,weight,bodytype,</h1>
          <h1>maritalstatus</h1>
          <h1>partner preference</h1> */
}
