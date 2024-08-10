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
      <button className="skip">Skip </button>
      <div className="box12">
        <div className="card1">
          <h3>personal details</h3>
          <div className="card1_1">
            <label htmlFor="">Gender</label>
            {/* <select name="gender" id="frame" onSelect={onPro}>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Other</option>
            </select>{" "} */}
            <input type="text" name="gender" onChange={onPro} id="" />
            <br />
            <label htmlFor="">Religion</label>
            <input type="text" name="religion" onChange={onPro} /> <br />
            <label htmlFor="">Horriscope</label>
            <input type="text" name="horriscope" onChange={onPro} /> <br />
            <label htmlFor="">Mother Toungue</label>
            <input type="text" name="motherTongue" onChange={onPro} />
            <br />
            <label htmlFor="">Marrital status</label>
            <input type="text" name="marrital" onChange={onPro} />
          </div>
        </div>
        <div className="card2">
          <h3>Basic info</h3>
          <div className="card1_2">
            <label htmlFor="">About</label>
            <textarea name="about" id="" onChange={onPro}></textarea>
            <br />
            <label htmlFor="">Height</label>
            <input type="number" name="height" onChange={onPro} />
            <br />
            <label htmlFor="">Weight</label>
            <input label="" type="number" name="weight" onChange={onPro} />
            <br />
            <label htmlFor="">Body type</label>
            <input type="text" name="bodytype" onChange={onPro} />
            <br />
          </div>
        </div>

        <div className="card3">
          <h3>Career</h3>
          <div className="card1_3">
            <label htmlFor="">Education</label>
            <input type="text" name="education" onChange={onPro} />
            <br />
            <label htmlFor="">Occupation</label>
            <input type="text" name="occupation" onChange={onPro} />
            <br />
            <label htmlFor="">Annual income</label>
            <input type="number" name="income" onChange={onPro} />
            <br />
            <label htmlFor="">Passion</label>
            <input type="text" name="passsion" onChange={onPro} />
            <br />
            <label htmlFor="">Future plans</label>
            <input type="text" name="futureplan" onChange={onPro} />
          </div>
        </div>
        <div className="card4">
          <h3>family</h3>
          <div className="card1_4">
            <label htmlFor="">Father Name</label>
            <input type="text" name="fathername" onChange={onPro} />
            <br />
            <label htmlFor="">Father Occupation</label>
            <input type="text" name="fatherjob" onChange={onPro} />
            <br />
            <label htmlFor="">Mother Name</label>
            <input type="text" name="mothername" onChange={onPro} />
            <br />
            <label htmlFor="">Mother Occupation</label>
            <input type="text" name="motherjob" onChange={onPro} />
            <br />
            <label htmlFor="">Siblings</label>
            <input type="text" name="siblings" onChange={onPro} />
          </div>
        </div>
        <div className="card5">
          <h3>Address</h3>
          <div className="card1_5">
            <label htmlFor="">Contact</label>
            <input type="number" name="contact" onChange={onPro} /> <br />
            <label htmlFor="">email</label>
            <input type="text" name="email" onChange={onPro} /> <br />
            <label htmlFor="">Address</label>
            <input type="text" name="address" onChange={onPro} /> <br />
          </div>
        </div>
      </div>
      <button className="sub" onClick={Next3}>
        Submit
      </button>

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
