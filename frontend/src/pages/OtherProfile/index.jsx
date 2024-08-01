import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getId } from "../../../src/utils/index.js";
import "./other.css";

const Other = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pro, setPro] = useState("");

  const Getprofile = async () => {
    const getresponse = await axios.get(
      `http://localhost:1400/user/profile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(getresponse);
    setData(getresponse.data);
  };

  const GetMyPro = async () => {
    const tresponse = await axios.get(
      `http://localhost:1400/user/profile/${getId()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(tresponse);
    setPro(tresponse.data.user._id);
  };

  useEffect(() => {
    Getprofile(), GetMyPro();
  }, []);
  const Chatbtn = () => {
    navigate(`/chat/${pro}`);
    // console.log("proooooooo", pro);
  };
  const Chat = (_id) => {
    navigate(`/chat/${_id}`);
  };
  const Hombtn = () => {
    navigate(`/landing/${getId()}`);
  };
  const proBtn = () => {
    navigate(`/mypro/${pro}`);
  };
  return (
    <div className="mypro">
      <div className="side4">
        <h1 className="Mypro">Matrimony</h1>

        <img className="propic1" src="\assets\Auth Images\profile3.jpeg" alt="" />
        {/* <button onClick={proBtn}>profile</button> */}
        {/* <h3 >Profile</h3> */}

        <button className="probt" onClick={Hombtn}>
          Home
        </button>

        <button className="probt" onClick={proBtn}>
          profile
        </button>
        <button className="probt" onClick={Chatbtn}>
          chat
        </button>

        <button className="probt">Notification</button>
        <button className="probt">settings </button>
        <button className="probt">About</button>
      </div>

      <div className="header4">
        <div className="image6">
          {/* <img className="img4" src="\profile2.jpeg" alt="" /> */}
          <img className="arrow" src="\assets\Auth Images\arrow1.png" alt="" />
          <img className="img4" src="\assets\Auth Images\profile5.jpeg" alt="" />
          <div className="botImg">
            <br />
            <div className="name12">
              <h2> {data.user && data.user.name} ,</h2>
              <h2> {data.reg && data.reg.age}</h2>
            </div>
            <h3>Location : {data.address}</h3>
            <img src="\assets\Auth Images\Match Percentage.svg" alt="" />
          </div>
        </div>
        <div className="components">
          {/* <h1>halo</h1> */}
          <img className="img122" src="\assets\Auth Images\Button2.jpg" alt="" />
          <img src="\Button1.jpg" alt="" />
          <img onClick={Hombtn} src="\assets\Auth Images\Button.jpg" alt="" />
          <img
            onClick={() => Chat(data._id)}
            className="msg12"
            src="\Message.jpg"
            alt=""
          />
        </div>

        <button className="btn4">Logout</button>
      </div>
      <div className="context4">
        {/* <h1>MyProfile</h1> */}
        {/* <div className="user">
          <h2>User details</h2>
          <br />
          <h3>Name : {data.user && data.user.name}</h3>
  <h3>Age : {data.reg && data.reg.age}</h3>
          <br />
        </div> */}
        <div className="about">
          <h2>About</h2>
          <h3>About :{data.about}</h3>
          <h3>username : {data.user && data.user.username}</h3>
        </div>
        <div className="habbits">
          <h2>Habbits</h2>
          <h3>Drinking:{data.reg && data.reg.drinking}</h3>
          <h3>Smoking:{data.reg && data.reg.smoking}</h3>
          <h3>Hobbies{data.reg && data.reg.hobbies}</h3>
        </div>
        <br />
        <div className="personaldet">
          <h2>Personal details</h2>
          <h3>Gender: {data.gender}</h3>

          <h3>DOB:{data.reg && data.reg.dob}</h3>
          {/* <h3>{data.reg && data.reg.propic}</h3> */}
          <h3>Qualification{data.reg && data.reg.qualification}</h3>
          <h3>Education:{data.education}</h3>
        </div>
        {/* <h3>Proflepic:{data.reg && data.reg.propic}</h3> */}
        <br />
        <div className="jobss">
          <h2>Job Details</h2>
          <br />
          <h3>Company{data.job && data.job.company}</h3>
          <h3>Designation: {data.job && data.job.designation}</h3>
          <h3>Location{data.job && data.job.location}</h3>
        </div>{" "}
        <br />
        <div className="contact">
          <h2>Contact</h2>
          <h3>Address:{data.address}</h3>
          <h3>Contact{data.contact}</h3>
          <h3>Email:{data.email}</h3>
        </div>
        <div className="bodytype">
          <h2>Body type</h2>
          <h3>Body Type: {data.bodytype}</h3>
          <h3>Height :{data.height}</h3>
          <h3>Weight :{data.weight}</h3>
        </div>
        <div className="Family">
          <h2>Family</h2>
          <h3>Father job :{data.fatherjob}</h3>
          <h3>Mother Job :{data.motherjob}</h3>
          <h3>Siblings :{data.siblings}</h3>
        </div>
        <div className="pro-det">
          <h2>Profile Details</h2>

          <h3>Occupation :{data.occupation}</h3>
          <h3>Passion :{data.passion}</h3>
          <h3>Future Plan :{data.futureplan}</h3>
          <h3>Income{data.income}</h3>
        </div>
        <div className="Religion">
          <h2>Religion</h2>
          <h3>Religion :{data.religion}</h3>
          <h3>Marrital status :{data.marrital}</h3>
          <h3>Mother Tongue :{data.motherTongue}</h3>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Other;
