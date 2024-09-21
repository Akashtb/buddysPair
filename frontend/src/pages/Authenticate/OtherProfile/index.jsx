import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
// import { getId } from "../../../src/utils/index.js";
import "./other.css";
import useAxiosPrivate from "../../../CustomApi/UseAxiosPrivate";
import IdContext from "../../../context/IdContext";
import { FaCommentSlash } from "react-icons/fa";

const Other = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [color1, setColor1] = useState("white");
  const [color2, setColor2] = useState("none");
  const [data, setData] = useState([]);
  const [pro, setPro] = useState("");
  // const [halo, sethalo] = useState(false);
  const [heart, setHeart] = useState(false);
  const [heart2, setHeart2] = useState(false);
  const [broken, setBroken] = useState(false);
  const [star, setStar] = useState(false);
  const [ban, setBan] = useState(false);
  const [choice, setChoice] = useState(false);
  // const [count, setCount] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);

  const Getprofile = async () => {
    const response = await axiosPrivate.get(
      `/api/matrimony/profile/getProfile/${id}`
    );
    setData(response.data);
  };

  const profileisViewed = async () => {
    const response = await axiosPrivate.put(
      `/api/matrimony/profile/viewedOtherProfile/${matrimonyProfileId}`,
      { otherProfileId: id }
    );
    console.log("profile is viwed ", response.data);
  };

  useEffect(() => {
    // setChoice(true);
    // setBroken(true);
    // setHeart(true);
    // setHeart2(true);
    // setStar(true);
    // setBan(true);
    Getprofile(), profileisViewed();
  }, [id]);
  // const Chatbtn = () => {
  //   navigate(`/chat/${pro}`);
  //   // console.log("proooooooo", pro);
  // };
  const Chat = (_id) => {
    navigate(`/chat/${_id}`);
  };
  const Hombtn = () => {
    navigate(`/landing/${getId()}`);
  };
  // const proBtn = () => {
  //   navigate(`/mypro/${pro}`);
  // };

  const formattedDate = new Date(data.dateOfBirth).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const onGallery = () => {
    navigate(`/gallery/${data._id}`);
  };

  const ColorChange = () => {
    setColor1("white");
    setColor2(" rgb(234, 186, 246)");
  };
  const ColorChange2 = () => {
    setColor1(" rgb(234, 186, 246)");
    setColor2("white");
  };

  const OnStar = () => {
    setStar(!star);
    if (star) {
      console.log("eject");
    } else {
      console.log("sort");
    }
  };

  const OnHeart = () => {
    setHeart2(!heart2);
    if (heart2) {
      console.log("request cancelled");
    } else {
      console.log("request send");
    }
  };

  const Accept = (key) => {
    if (key == 1) {
      console.log("accept");
      // setChoice(false);
      // setHeart(true);
      // setBan(false);
    } else {
      console.log("decline");
      // setChoice(false);
      // setHeart(false);
      // setBan(true);
    }
  };

  const renderIcons = () => {
    const { status, fromUID } = connectionStatus;

    if (status === "pending" && fromUID === matrimonyProfileId) {
      return <>{(setHeart(false), setStar(false), setBan(true))};</>;
    }

    if (status === "accepted" && fromUID === matrimonyProfileId) {
      return <>{(setHeart(true), setBan(false))}</>;
    }

    if (status === "rejected" && fromUID === matrimonyProfileId) {
      return <>{(setBroken(true), setBan(true))}</>;
    }

    if (status === "pending" && fromUID !== matrimonyProfileId) {
      return <>{setChoice(true)}</>;
    }

    if (status === "accepted" && fromUID !== matrimonyProfileId) {
      return <>{(setChoice(false), setHeart(true), setBan(false))}</>;
    }

    if (status === "rejected" && fromUID !== matrimonyProfileId) {
      return <>{(setHeart(false), setBan(true))}</>;
    }
  };

  return (
    <div className="anoop19">
      <div className="side1-6">
        <h1>Matrimony</h1>
        <h3 onClick={() => handleNavigation("/buddysHomePage")}>
          <i className="fa-solid fa-house"></i> Home
        </h3>

        <h3 onClick={() => handleNavigation("/message")}>
          <i className="fa-brands fa-facebook-messenger"></i> Message
        </h3>

        <h3 onClick={() => handleNavigation("/favorites")}>
          <i className="fa-solid fa-star"></i> Favorites
        </h3>

        <h3 onClick={() => handleNavigation("/notifications")}>
          <i className="fa-solid fa-bell"></i> Notifications
        </h3>

        <h3 onClick={() => handleNavigation("/settings")}>
          <i className="fa-solid fa-gear"></i> Settings
        </h3>

        <h3 className="pro1-6">
          <i class="fa-solid fa-user"></i> Profile
        </h3>
      </div>
      <div className="header4">
        <i class="fa-solid fa-angle-left" onClick={handleBack}></i>

        <div className="image6">
          {/* <img className="img4" src="\profile2.jpeg" alt="" />///////// */}

          {/* <img
            className="scroll"
            src="../../../src/assets/Authentication/Scroll.svg"
            alt=""
          /> */}
          <img
            className="img4"
            src="../../../src/assets/Authentication/profile1.jpeg"
            alt=""
          />
          {/* <img className="img4" src={data?.profilePic} alt="" /> */}
          <div className="botImg">
            <br />
            <div className="name12">
              <h2>
                {" "}
                {data?.firstName} {data?.lastName},
              </h2>
              <h2> {data?.age}</h2>
            </div>
            <h3>Location : {data.address}</h3>
            <img
              src="../../../src/assets/Authentication/Match Percentage.svg"
              alt=""
            />
          </div>
          <div className="extra">
            <div className="view2">
              <img
                onClick={onGallery}
                className="viewimg"
                src="https://th.bing.com/th/id/OIGP.TmXbZ0WBVGvkkhJpqZeI?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
                alt=""
              />
              <h3>View gallery</h3>
            </div>
          </div>
        </div>
        <img
          className="arrow"
          src="../../../src/assets/Authentication/Tag.svg"
          alt=""
        />

        {/* <button className="btn4">Logout</button> */}
      </div>
      <div className="links">
        <div className="links2">
          <div className="links2">
            <a
              id="ou"
              href="#sec1"
              tabIndex="1"
              onClick={ColorChange}
              style={{ backgroundColor: color1 }}
            >
              About
            </a>

            <a
              id="ther"
              href="#sec2"
              onClick={ColorChange2}
              style={{ backgroundColor: color2 }}
            >
              contact info
            </a>
          </div>
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
              <h3>
                username : {data?.firstName} {data?.lastName}
              </h3>
            </div>
            <div className="habbits">
              <h2>Habbits</h2>
              <h3>Drinking : {data.drinking ? "Yes" : "No"}</h3>
              <h3>Smoking :{data.smoking ? "Yes" : "No"}</h3>
              <h3>Hobbies :{data.hobbies?.join(", ")}</h3>
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
        {/* <motion whileTap={{ scale: 1.2 }}>
          
          <i id="one" onClick={Hombtn} class="fa-solid fa-circle-xmark"></i>
        </motion> */}
        <motion.i
          whileHover={{ scale: 1.2, color: "orange" }}
          id="one"
          onClick={Hombtn}
          class="fa-solid fa-circle-xmark"
        ></motion.i>

        {choice ? (
          <>
            <p id="p1" onClick={() => Accept(1)} style={{ cursor: "pointer" }}>
              Accept
            </p>
            <p id="p2" onClick={() => Accept(2)} style={{ cursor: "pointer" }}>
              Reject
            </p>
          </>
        ) : broken ? (
          <motion.i
            id="two-two"
            // whileHover={{ scale: 1.2 }}
            class="fa-solid fa-heart-crack"
          ></motion.i>
        ) : (
          <motion.i
            onClick={OnHeart}
            whileHover={{ scale: 1.2 }}
            id={heart ? "two-one" : heart2 ? "two-three" : "two"}
            class="fa-solid fa-heart"
          ></motion.i>
        )}

        <motion.i
          onClick={OnStar}
          whileHover={{ scale: 1.2 }}
          id={star ? "three-one" : "three"}
          class="fa-solid fa-star"
        ></motion.i>

        {choice ? (
          ""
        ) : ban ? (
          <span id="four-two">
            <FaCommentSlash />
          </span>
        ) : (
          <motion.i
            whileHover={{ scale: 1.2, backgroundColor: "rgb(250, 185, 137)" }}
            id="four"
            onClick={() => Chat(data._id)}
            class="fa-solid fa-comment"
          ></motion.i>
        )}
      </div>
      {/* <footer>
        <h4>Haaai</h4>
      </footer> */}
    </div>
  );
};

export default Other;
