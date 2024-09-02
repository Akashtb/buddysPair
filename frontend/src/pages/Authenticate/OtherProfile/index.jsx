import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { getId } from "../../../src/utils/index.js";
import "./other.css";
import useAxiosPrivate from "../../../CustomApi/UseAxiosPrivate";
import IdContext from "../../../context/IdContext";

const Other = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pro, setPro] = useState("");
  const [halo, sethalo] = useState(false);
  const axiosPrivate = useAxiosPrivate()
  const { matrimonyProfileId } = useContext(IdContext);


  const Getprofile = async () => {
    const response = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${id}`)
    setData(response.data);
  };

  const profileisViewed =async()=>{
    const response = await axiosPrivate.put(`/api/matrimony/profile/viewedOtherProfile/${matrimonyProfileId}`,{otherProfileId:id})
    console.log("profile is viwed ",response.data);
    
  }
  
  

  useEffect(() => {
    Getprofile(),profileisViewed()
  }, [id]);
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

  const formattedDate = new Date(data.dateOfBirth).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});



  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="anoop19">
      <div className="side1-6">
        <h1>Matrimony</h1>
        <h3 onClick={() => handleNavigation('/buddysHomePage')}>
        <i className="fa-solid fa-house"></i> Home
      </h3>

      <h3 onClick={() => handleNavigation('/message')}>
        <i className="fa-brands fa-facebook-messenger"></i> Message
      </h3>

      <h3 onClick={() => handleNavigation('/favorites')}>
        <i className="fa-solid fa-star"></i> Favorites
      </h3>

      <h3 onClick={() => handleNavigation('/notifications')}>
        <i className="fa-solid fa-bell"></i> Notifications
      </h3>

      <h3 onClick={() => handleNavigation('/settings')}>
        <i className="fa-solid fa-gear"></i> Settings
      </h3>

        <h3 className="pro1-6">
          <i class="fa-solid fa-user"></i> Profile
        </h3>
      </div>
      <div className="header4">
        <i class="fa-solid fa-angle-left"></i>
        <div className="image6">
          {/* <img className="img4" src="\profile2.jpeg" alt="" /> */}
          <img
            className="arrow"
            src="../../../src/assets/Authentication/Tag.svg"
            alt=""
          />
          <img
            className="scroll"
            src="../../../src/assets/Authentication/Scroll.svg"
            alt=""
          />
          <img
            className="img4"
            src={data?.profilePic}
            alt=""
          />
          <div className="botImg">
            <br />
            <div className="name12">
              <h2> {data?.firstName} {data?.lastName},</h2>
              <h2> {data?.age}</h2>
            </div>
            <h3>Location : {data.address}</h3>
            <img
              src="../../../src/assets/Authentication/Match Percentage.svg"
              alt=""
            />
          </div>
        </div>

        {/* <button className="btn4">Logout</button> */}
      </div>
      <div className="links">
        <div className="links2">
          <a id="ou" href="#sec1">
            About
          </a>

          <a id="ther" href="#sec2">
            contact info
          </a>
        </div>
      </div>

      <div className="context4">
        {/* <p className="p3"></p> */}
        {/* <h1>MyProfile</h1> */}
        {/* <div className="user">
          <h2>User details</h2>
          <br />
          <h3>Name : {data.user && data.user.name}</h3>
  <h3>Age : {data.reg && data.reg.age}</h3>
          <br />
        </div> */}

        <div className="swap">
          <section className="s1" id="sec1" href="#ou">
            <div className="about">
              <h2>About</h2>
              <h3 className="ab"> {data.aboutMe}</h3>
              <h3>username : {data?.firstName} {data?.lastName}</h3>
            </div>
            <div className="habbits">
              <h2>Habbits</h2>
              <h3>Drinking : {data.drinking ? 'Yes' : 'No'}</h3>
              <h3>Smoking :{data.smoking ? 'Yes' : 'No'}</h3>
              <h3>Hobbies :{data.hobbies?.join(', ')}</h3>
            </div>

            <div className="personaldet">
              <h2>Personal details</h2>
              <h3>Gender: {data.gender}</h3>

              <h3>DOB:{formattedDate}</h3>
              {/* <h3>{data.reg && data.reg.propic}</h3> */}
              <h3>Qualification:{data?.qualification}</h3>
              <h3>Proffesion:{data?.profession}</h3>
            </div>
            {/* <h3>Proflepic:{data.reg && data.reg.propic}</h3> */}

            <div className="jobss">
              <h2>Job Details</h2>
              <br />
              <h3>Company{data.job && data.job.company}</h3>
              <h3>Designation: {data.job && data.job.designation}</h3>
              <h3>Location{data.job && data.job.location}</h3>
            </div>
          </section>

          {/* /////////////////// */}
          <section className="s2" id="sec2">
            <div className="contact">
              <h2>Contact</h2>
              <h3>Address:{data?.address}</h3>
              {/* <h3>Contact{data.contact}</h3> */}
              <h3>Email:{data?.email}</h3>
            </div>
            <div className="bodytype">
              <h2>Body type</h2>
              <h3>Body Type: {data?.bodyType}</h3>
              <h3>Height :{data?.height}</h3>
              <h3>Weight :{data?.weight}</h3>
            </div>
            <div className="Family">
              <h2>Family</h2>
              <h3>Father job :{data?.fatherOccupation}</h3>
              <h3>Mother Job :{data?.motherOccupation}</h3>
              {/* <h3>Siblings :{data?.siblings}</h3> */}
            </div>
            {/* <div className="pro-det">
              <h2>Profile Details</h2>

              <h3>Occupation :{data.occupation}</h3>
              <h3>Passion :{data.passion}</h3>
              <h3>Future Plan :{data.futureplan}</h3>
              <h3>Income{data.income}</h3>
            </div> */}
            <div className="Religion">
              <h2>Religion</h2>
              <h3>Religion :{data?.religion}</h3>
              <h3>Marrital status :{data?.martialStatus}</h3>
              <h3>Mother Tongue :{data?.motherTongue}</h3>
            </div>
          </section>
        </div>
      </div>
      <div className="components">
        {/* <h1>halo</h1> */}
        <img
          onClick={Hombtn}
          className="img122"
          src="../../../src/assets/Authentication/Button.jpg"
          alt=""
        />
        <img
          className="img122"
          src="../../../src/assets/Authentication/Button1.jpg"
          alt=""
        />
        <img
          className="img122"
          src="../../../src/assets/Authentication/Button2.jpg"
          alt=""
        />
        <img
          onClick={() => Chat(data._id)}
          className="msg12"
          src="../../../src/assets/Authentication/Message.jpg"
          alt=""
        />
      </div>
      {/* <footer>
        <h4>Haaai</h4>
      </footer> */}
    </div>
  );
};

export default Other;
