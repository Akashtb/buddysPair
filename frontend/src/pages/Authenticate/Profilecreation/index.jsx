import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./profile.css";

import { useContext } from "react";
import IdContext from "../../../context/IdContext";
import { axiosPrivate } from "../../../CustomApi/Axios";

const Profile = () => {
  const { setRegisterId } = useContext(IdContext);
  const navigate = useNavigate();
  const [reRegistrationData, setreRegistrationData] = useState({
    state: "",
    district: "",
    city: "",
    profession: "",
    qualification: "",
    religion: "",
    motherTongue: "",
    aboutMe: "",
    height: "",
    weight: "",
    bodyType: "",
    martialStatus: "",
    familyType: "",
    diabilities: "",
    caste: "",
    patnerExpectation: "",
    fatherName: "",
    numberOfMarriedSibilings: "",
    numberOfSibilings: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    address: "",
  });
  const dataChange = (e) => {
    setreRegistrationData({
      ...reRegistrationData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(reRegistrationData);

  const profileReRegistraion = async () => {
    const { state, district,city,profession,qualification,religion,motherTongue,aboutMe,height,weight,bodyType,martialStatus,familyType,diabilities,caste,patnerExpectation,fatherName,numberOfMarriedSibilings,numberOfSibilings,fatherOccupation,motherName,motherOccupation,address} = reRegistrationData

    if (!state) {
      toast.error("Please fill the state");
      return;
    }
    if (!district) {
      toast.error("Please fill the district");
      return;
    }
    if (!city) {
      toast.error("Please fill the city");
      return;
    }
    // if (!profession) {
    //   toast.error("Please fill the profession");
    //   return;
    // }
    if (!qualification) {
      toast.error("Please fill the qualification");
      return;
    }
    // if (!religion) {
    //   toast.error("Please select a religion");
    //   return;
    // }
    if (!motherTongue) {
      toast.error("Please fill the mother tongue");
      return;
    }
    if (!aboutMe) {
      toast.error("Please fill the about me section");
      return;
    }
    if (!height) {
      toast.error("Please enter height");
      return;
    }
    if (!weight) {
      toast.error("Please enter weight");
      return;
    }
    if (!bodyType) {
      toast.error("Please select a body type");
      return;
    }
    if (!martialStatus) {
      toast.error("Please select marital status");
      return;
    }
    if (!familyType) {
      toast.error("Please select family type");
      return;
    }
    if (!diabilities) {
      toast.error("Please mention if there are any disabilities");
      return;
    }
    if (!caste) {
      toast.error("Please fill the caste");
      return;
    }
    if (!patnerExpectation) {
      toast.error("Please fill the partner expectation");
      return;
    }
    if (!fatherName) {
      toast.error("Please enter the father's name");
      return;
    }
    if (!numberOfMarriedSibilings) {
      toast.error("Please enter the number of married siblings");
      return;
    }
    if (!numberOfSibilings) {
      toast.error("Please enter the number of siblings");
      return;
    }
    if (!fatherOccupation) {
      toast.error("Please enter the father's occupation");
      return;
    }
    if (!motherName) {
      toast.error("Please enter the mother's name");
      return;
    }
    if (!motherOccupation) {
      toast.error("Please enter the mother's occupation");
      return;
    }
    if (!address) {
      toast.error("Please enter the address");
      return;
    }
  
    try {
      const response = await axiosPrivate.post(
        `/api/matrimony/profile/createProfile`,
        reRegistrationData
      );
      console.log(response.data);
      if (response.status === 201) {
        await axiosPrivate.post("/api/auth/logout");
        localStorage.removeItem("registerId");
        setRegisterId(null);
        toast.success("Profile created successfully");
        navigate("/login");
      } else {
        toast.error("Failed to create profile");
      }
    } catch (error) {
      toast.error("An error occurred while creating the profile");
      console.error(error);
    }
  };

  return (
    <div className="anoop15">
      {/* <h1 className="head">Matrimony</h1> */}

      <div className="box12">
        <h3>Additional details</h3>
        <div className="box77">
          <div className="card55">
            <textarea
              placeholder="About"
              type="text"
              name="aboutMe"
              onChange={dataChange}
            ></textarea>
            <br />{" "}
            <select name="martialStatus" onChange={dataChange}>
              <option value="">Marital Status</option>
              <option value="married">Married</option>
              <option value="unmarried">Unmarried</option>
            </select>
            <br />
            {/* <label htmlFor="">Horriscope</label> */}
            <input
              placeholder="Family Type"
              type="text"
              name="familyType"
              onChange={dataChange}
            />{" "}
            <br />
            {/* <label htmlFor="">Marrital status</label> */}
            <input
              placeholder="Father's Name"
              type="text"
              name="fatherName"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">About</label> */}
            <input
              placeholder="Father's Occupation"
              type="text"
              name="fatherOccupation"
              onChange={dataChange}
            ></input>
            <br />
            {/* <label htmlFor="">Height</label> */}
            <input
              placeholder="Mother's Name"
              type="text"
              name="motherName"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">Weight</label> */}
            <input
              placeholder="Mother's Occupation"
              type="text"
              name="motherOccupation"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">Body type</label> */}
            <input
              placeholder="Number of Siblings"
              type="number"
              name="numberOfSibilings"
              onChange={dataChange}
            />
            <br />
            <input
              placeholder="Number of Siblings Married"
              type="number"
              name="numberOfMarriedSibilings"
              onChange={dataChange}
            />{" "}
            <br />
            <input
              placeholder="Address"
              type="text"
              name="address"
              onChange={dataChange}
            />{" "}
            <br />
            <input
              placeholder="Mother Tongue"
              type="text"
              name="motherTongue"
              onChange={dataChange}
            />
            {/* <label htmlFor="">Education</label> */}
          </div>
          <br />
          <div className="card66">
            {/* <label htmlFor="">Annual income</label> */}
            <input
              placeholder="Height"
              type="number"
              name="height"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">Passion</label> */}
            <input
              placeholder="Weight"
              type="number"
              name="weight"
              onChange={dataChange}
            />
            <br />
            <input
              placeholder="State"
              type="text"
              name="state"
              onChange={dataChange}
            />
            <br />
            <select
              placeholder="District"
              type="text"
              name="district"
              onChange={dataChange}
              id=""
            >
              <option value="">District</option>
              <option value="Alappuzha">Alappuzha</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Idukki">Idukki</option>
              <option value="Kannur">Kannur</option>
              <option value="Kasargod">Kasargod</option>
              <option value="Kollam">Kollam</option>
              <option value="Kottayam">Kottayam</option>
              <option value="Kozhikode">Kozhikode</option>
              <option value="Malappuram">Malappuram</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Pathanamthitta">Pathanamthitta</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Thrissur">Thrissur</option>
              <option value="Wayanad">Wayanad</option>
            </select>
            <br />
            <input
              placeholder="City"
              type="text"
              name="city"
              onChange={dataChange}
            />
            <br />
            <select
              placeholder="Profession"
              type="text"
              name="profession"
              onChange={dataChange}
              id=""
            >
              <option value="">Profession</option>
              <option value="">IT</option>
              <option value="">Accountant</option>
            </select>
            <br />
            <select
              placeholder="qualification"
              type="text"
              name="qualification"
              onChange={dataChange}
              id=""
            >
              <option value="">Qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="Doctorate">Doctorate</option>
            </select>
            <br />
            {/* <label htmlFor="">Future plans</label> */}
            <input
              placeholder="Body Type"
              type="text"
              name="bodyType"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">Father Occupation</label> */}
            <input
              placeholder="Disabilities"
              type="text"
              name="diabilities"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">Mother Name</label> */}
            <select
              placeholder="Religion"
              type="text"
              name="religion"
              onChange={dataChange}
              id=""
            >
              <option value="">Religion</option>
              <option value="">Christian</option>
              <option value="">Islam</option>
              <option value="">Hindu</option>
              <option value="">Other</option>
            </select>
            <br />
            {/* <label  htmlFor="">Mother Occupation</label> */}
            <input
              placeholder="Cast/Community"
              type="text"
              name="caste"
              onChange={dataChange}
            />
            <br />
            {/* <label htmlFor="">Siblings</label> */}
            <input
              placeholder="Expectaions from Partner"
              type="text"
              name="patnerExpectation"
              onChange={dataChange}
            />{" "}
            <br />
          </div>
        </div>
        <button className="sub" onClick={profileReRegistraion}>
          Next
        </button>
      </div>

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
