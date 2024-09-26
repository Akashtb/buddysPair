import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
// import { getId } from "../../../src/utils/index.js";
import "./other.css";
import useAxiosPrivate from "../../../CustomApi/UseAxiosPrivate";
import IdContext from "../../../context/IdContext";
import { FaCommentSlash } from "react-icons/fa";
// import { BiRefresh } from "react-icons/bi";
import { toast, useToastContainer } from "react-toastify";
import SocketContext from "../../../context/SocketContext";
// import { text } from "stream/consumers";
// const [isSentRequest, setIsSentRequest] = useState(false);

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
  const [block, setBlock] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [accept, setAccept] = useState(false);
  // const [connectionStatus, setConnectionStatus] = useState({});
  const [connection, setConnection] = useState({});
  // const [count, setCount] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useContext(SocketContext);
  const { matrimonyProfileId } = useContext(IdContext);
  

  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("requestReceived", ({ fromUID, toUID, fromUIDFullName }) => {
          console.log("requestReceived event fired");
          if (fromUID === id) {
            setConnection((prev) => ({ ...prev, status: "pending" }));
          }
        }
      );

      socket.current.on('cancelReceived', ({ fromUID, requestToId, fromUIDFullName }) => {        
        if (fromUID === id) {
          console.log("cancel event fired",fromUIDFullName);
          setConnection((prev) => ({ ...prev, status: 'not_found' }));
        }
      });

      socket.current.on("unfriend",({ userId, otherUserId, userFullName }) => {
        if (userId === id) {
          console.log("unfriend event fired",userFullName);
          setConnection((prev) => ({ ...prev, status: "not_found" }));
        }
      }
    );

    socket.current.on("unblocked",({ userId, otherUserId, userFullName }) => {
      if (userId === id) {
        console.log("unBlocked event fired",userFullName);
        setConnection((prev) => ({ ...prev, status: "not_found" }));
      }
    }
  );

      socket.current.on(
        "acceptRequest",
        ({ requestFromId, requestToId, toUIDFullName }) => {
          if (String(requestToId) === String(id)) {
            setConnection((prev) => ({ ...prev, status: "accepted" }));
          }
        }
      );

      socket.current.on(
        "rejectRequest",
        ({ requestFromId, requestToId, toUIDFullName }) => {
          if (String(requestToId) === String(profile?._id)) {
            setConnection((prev) => ({ ...prev, status: "rejected" }));
          }
        }
      );

      socket.current.on("blocked", ({ userId, userFullName, otherUserId }) => {
        console.log("blocked is called", userFullName);

        if (String(userId) === String(id)) {
          setConnection((prev) => ({ ...prev, status: "blocked" }))
        }
      });


      // Clean up listener on component unmount
      return () => {
        socket.current.off("requestReceived");
        socket.current.off("blocked");
        socket.current.off("cancelReceived");
        socket.current.off("unfriend");
        socket.current.off("unblocked");

        socket.current.off("acceptRequest");
        socket.current.off("rejectRequest");
      };
    }
  }, [socket.current, matrimonyProfileId,id]);

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

  const shortlist = async () => {
    const response = await axiosPrivate.get(
      `/api/matrimony/profile/shortListedList/${matrimonyProfileId}`
    );
    console.log("short person", response.data.message);
    if (response.data.message) {
      return setStar(false);
    } else {
      return setStar(true);
    }
  };

  // useEffect(() => {
  // setChoice(true);
  // setBroken(true);
  // setHeart(true);
  // setHeart2(true);
  // setStar(true);
  // setBan(true);
  // Getprofile(), profileisViewed();
  // }, [id]);
  // const Chatbtn = () => {
  //   navigate(`/chat/${pro}`);
  //   // console.log("proooooooo", pro);
  // };
  const Chat = () => {
    navigate(`/message`);
  };
  const Hombtn = () => {
    navigate(`/buddysHomePage`);
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

  // const OnStar = () => {
  //   setStar(!star);
  //   if (star) {
  //     console.log("eject");
  //   } else {
  //     console.log("sort");
  //   }
  // };

  const OnStar = async () => {
    try {
      if (star) {
        // Unshortlist the profile
        try {
          await axiosPrivate.delete(
            `/api/matrimony/profile/cancelshortListTheProfile/${matrimonyProfileId}/${id}`
          );
          toast.success("you have sort out the user from the shorlist");
          // setIsLiked(false);
          setStar(false);
        } catch (error) {
          console.error("Error unshortlisting profile:", error);
          toast.error(
            "Failed to unshortlist the profile. Please try again later."
          );
        }
      } else {
        try {
          await axiosPrivate.post(
            `/api/matrimony/profile/shortListTheProfile/${matrimonyProfileId}`,
            {
              profileId: id,
            }
          );
          toast.success("you have shortlist the user");
          // setIsLiked(true);
          setStar(true);
        } catch (error) {
          console.error("Error shortlisting profile:", error);

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            if (
              error.response.data.message ===
              "You have already received a request from this user or you have sent request to this user"
            ) {
              toast.error("You have already made a connection request.");
              setStar(false);
            } else {
              toast.error(error.response.data.message);
            }
          } else {
            toast.error(
              "Failed to shortlist the profile. Please try again later."
            );
          }
        }
      }
    } catch (error) {
      console.error("Unexpected error in handleLikeClick:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const OnHeart = async () => {
    try {
      //unfriend
      if (heart) {
        try {
          await axiosPrivate.post(
            `/api/matrimony/profile/unfriend/${matrimonyProfileId}`,
            { otherUserId: id }
          );
          // setAcceptOrReject(true);
          // SetNoLikeIcon(true);
          setHeart(false);
          setHeart2(false);
          setRefresh(!refresh);
          setBan(true)
          toast.success("You have remove the friend successfully");
        } catch (error) {
          console.error("Error accepting request:", error);
          toast.error(
            "User might remove the friend to check. Please Refresh the page."
          );
        }

        ///////
        // setHeart(false);
      } else if (heart2) {
        // cancel request
        try {
          await axiosPrivate.delete(
            `/api/matrimony/profile/cancelTheRequest/${matrimonyProfileId}?requestToId=${id}`
          );
          toast.success("you have successfully cancel the send request");
          // findConnectionStatus();
          setRefresh(!refresh);
          setHeart2(false);
        } catch (error) {
          console.error("Error unshortlisting profile:", error);
          toast.error(
            "Failed to cancel the request either you have accept or get reject"
          );
        }
      } else {
        //send request
        try {
          await axiosPrivate.post(
            `/api/matrimony/profile/sendRequest/${matrimonyProfileId}`,
            {
              toUID: id,
            }
          );
          toast.success("you have send Request successfully");
          findConnectionStatus();
          // setRefresh(!refresh);
          setHeart2(true);
          setStar(false);
          // setIsLiked(false);
        } catch (error) {
          console.error("Error shortlisting profile:", error);

          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            if (
              error.response.data.message ===
              "You have already received a request from this user"
            ) {
              toast.error(
                "You have already received a request from this user, please refresh the page"
              );
              setHeart2(true);
            } else {
              toast.error(error.response.data.message);
            }
          } else {
            toast.error(
              "Failed to shortlist the profile. Please try again later."
            );
          }
        }
      }
    } catch (error) {
      console.error("Unexpected error in handleLikeClick:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }

    ///////////
    // setHeart2(!heart2);
    // if (heart2) {
    //   console.log("request cancelled");
    // } else {
    //   console.log("request send");
    // }
  };

  const Reject = async () => {
    // const handleReject = async () => {
    try {
      await axiosPrivate.post(
        `/api/matrimony/profile/rejectTheRequest/${matrimonyProfileId}`,
        { requestFromId: id }
      );

      // setAcceptOrReject(true);
      // SetNoLikeIcon(true);
      setChoice(false);
      setHeart(false);
      setBan(true);
      toast.success("You have rejected the request successfully");
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error(
        "User might cancel the request to check. Please Refresh the page."
      );
    }
    // };

    ////////////
    // if (key == 1) {
    //   console.log("accept");
    //   // setChoice(false);
    //   // setHeart(true);
    //   // setBan(false);
    // } else {
    //   console.log("decline");
    //   // setChoice(false);
    //   // setHeart(false);
    //   // setBan(true);
    // }
  };

  const Accept = async () => {
    try {
      await axiosPrivate.post(
        `/api/matrimony/profile/acceptRequest/${matrimonyProfileId}`,
        { requestFromId: id }
      );

      // setAcceptOrReject(true);
      // SetNoLikeIcon(true);
      setChoice(false);
      setHeart(true);
      setBan(false);
      toast.success("You have accepted the request successfully");
      // setRefresh(!refresh);
      findConnectionStatus();
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error(
        "User might cancel the request to check. Please Refresh the page."
      );
    }
  };

  // const findConnectionStatus = async () => {

  // };

  const handleBlock = async () => {
    try {
      await axiosPrivate.post(
        `/api/matrimony/profile/block/${matrimonyProfileId}`,
        { otherUserId: id }
      );

      // setAcceptOrReject(true);
      // SetNoLikeIcon(true);
      // setBlock(true);
      setChoice(false);
      setBan(true);
      setBlock(true);
      toast.success("You have blocked the request successfully");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(
          error.response.data.message ||
            "Failed to block the request. Please try again."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error(
          "No response from the server. Please check your network connection and try again."
        );
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  /////////////////////
  // const handleBlock = async () => {
  //   try {
  //     await axiosPrivate.post(`/api/matrimony/profile/block/${matrimonyProfileId}`, { otherUserId: profile._id });

  //     if (Array.isArray(nearByProfileList)) {
  //       const updatedNearByList = nearByProfileList.filter(p => String(p._id) !== String(profile._id));
  //       setNearByProfileList([...updatedNearByList]);
  //     }

  //     if (Array.isArray(qulificationProfileList)) {
  //       const updatedQualificationList = qulificationProfileList.filter(p => String(p._id) !== String(profile._id));
  //       setQualificationProfileList([...updatedQualificationList]);
  //     }

  //     if (Array.isArray(designationProfileList)) {
  //       const updatedDesignationList = designationProfileList.filter(p => String(p._id) !== String(profile._id));
  //       setDesignationProfileList([...updatedDesignationList]);
  //     }

  //     setAcceptOrReject(true);
  //     SetNoLikeIcon(true);
  //     toast.success("You have blocked the request successfully.");
  //   } catch (error) {
  //     if (error.response) {
  //       console.error("Error response:", error.response.data);
  //       toast.error(error.response.data.message || "Failed to block the request. Please try again.");
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //       toast.error("No response from the server. Please check your network connection and try again.");
  //     } else {
  //       console.error("Error setting up the request:", error.message);
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };
  ////////////////

  const Unfriend = async () => {
    try {
      await axiosPrivate.post(
        `/api/matrimony/profile/unfriend/${matrimonyProfileId}`,
        { otherUserId: id }
      );

      // setAcceptOrReject(true);
      // SetNoLikeIcon(true);

      toast.success("You have remove the friend successfully");
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error(
        "User might remove the friend to check. Please Refresh the page."
      );
    }
  };

  const findConnectionStatus = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/matrimony/profile/connection-status/${matrimonyProfileId}/${id}`
      );
      console.log("halo dear");

      console.log("my connection", response.data);
      setConnection(response.data);
    } catch (error) {
      console.error("Error fetching connection status:", error);
    }
  };

  useEffect(() => {
    if (connection && Object.keys(connection).length !== 0) {
      render(connection);
    }
  }, [connection]); 
  //My Profile
  const render = (zz) => {
    console.log("hi halo", zz);
    const { status, fromUID, blockedBy } = zz;
  
    if (status === 'not_found') {
      setHeart(false);
      setHeart2(false);
      setBan(true);
    } else if (status === "blocked" && blockedBy === matrimonyProfileId) {
      setBlock(true);
      setChoice(false);
      setBan(true);
    } else if (status === "pending" && fromUID === matrimonyProfileId) {
      setHeart(false);
      setHeart2(true);
      setBan(true);
    } else if (status === "accepted" && fromUID === matrimonyProfileId) {
      setHeart(true);
      setBan(false);
      setAccept(true);
    } else if (status === "rejected" && fromUID === matrimonyProfileId) {
      setBroken(true);
      setBan(true);
    } else if (status === "blocked" && blockedBy !== matrimonyProfileId) {
      setBlock(true);
      setChoice(false);
      setBan(true);
    } else if (status === "pending" && fromUID !== matrimonyProfileId) {
      setChoice(true);
    } else if (status === "accepted" && fromUID !== matrimonyProfileId) {
      setChoice(false);
      setHeart(true);
      setBan(false);
      setAccept(true);
    } else if (status === "rejected" && fromUID !== matrimonyProfileId) {
      setHeart(false);
      setBan(true);
    }
  };
  

  useEffect(() => {
    // setChoice(true);
    // setBan(true);
    shortlist(), findConnectionStatus(), Getprofile(), profileisViewed();
    // render();
  }, [axiosPrivate, matrimonyProfileId, id,socket]);

  // renderIcons(connectionStatus);
  // console.log("hgsahyydgugyggggggyyyyyyyyug", connectionStatus);

  return (
    <div className="anoop19">
      <div className="side1-6">
        <h1>Matrimony</h1>
        <h3
          style={{ cursor: "context-menu" }}
          onClick={() => handleNavigation("/buddysHomePage")}
        >
          <i className="fa-solid fa-house"></i> Home
        </h3>

        <h3 onClick={() => handleNavigation("/message")}>
          <i className="fa-brands fa-facebook-messenger"></i> Message
        </h3>

        <h3 onClick={() => handleNavigation("/shortlist")}>
          <i className="fa-solid fa-star"></i> Favorites
        </h3>

        <h3 onClick={() => handleNavigation("/notifications")}>
          <i className="fa-solid fa-bell"></i> Notifications
        </h3>

        <h3 onClick={() => handleNavigation("/settings")}>
          <i className="fa-solid fa-gear"></i> Settings
        </h3>

        <h3 className="pro1-6" onClick={() => handleNavigation("/editProfile")}>
          <i class="fa-solid fa-user"></i> Profile
        </h3>
      </div>
      <div className="header4">
        <i class="fa-solid fa-angle-left" onClick={handleBack}></i>

        <div className="image6">
          <img
            className="arrow"
            src="../../../src/assets/Authentication/Tag.svg"
            alt=""
          />
          {/* <img className="img4" src="\profile2.jpeg" alt="" />///////// */}

          {/* <img
            className="scroll"
            src="../../../src/assets/Authentication/Scroll.svg"
            alt=""
          /> */}
          {/*  <img
            className="img4"
            src="../../../src/assets/Authentication/profile1.jpeg"
            alt=""
          />*/}
          <img className="img4" src={data?.profilePic} alt="" />
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
        </div>

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
            <button className="gallery-btn" onClick={onGallery}>
              view gallery
            </button>
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

            {/* <div className="jobss">
              <h2>Job Details</h2>
              <br />
              <h3>Company{data.job && data.job.company}</h3>
              <h3>Designation: {data.job && data.job.designation}</h3>
              <h3>Location{data.job && data.job.location}</h3>
            </div> */}
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

        {block ? (
          ""
        ) : choice ? (
          <>
            {/* <p id="p1" onClick={() => Accept(1)} style={{ cursor: "pointer" }}>
              Accept
            </p> */}
            <motion.i
              whileHover={{ scale: 1.2 }}
              id="p1"
              onClick={Reject}
              class="fa-solid fa-user-xmark"
            ></motion.i>
            {/* <p id="p2" onClick={() => Reject(2)} style={{ cursor: "pointer" }}>
              Reject
            </p> */}
            <motion.i
              whileHover={{ scale: 1.2 }}
              id="p2"
              onClick={Accept}
              class="fa-solid fa-user-check"
            ></motion.i>
            <motion.i
              onClick={handleBlock}
              id="p3"
              whileHover={{ scale: 1.2 }}
              class="fa-solid fa-user-large-slash"
            ></motion.i>
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
        {accept ? (
          <motion.i
            onClick={handleBlock}
            id="p3"
            whileHover={{ scale: 1.2 }}
            class="fa-solid fa-user-large-slash"
          ></motion.i>
        ) : (
          <motion.i
            onClick={OnStar}
            whileHover={{ scale: 1.2 }}
            id={star ? "three-one" : "three"}
            class="fa-solid fa-star"
          ></motion.i>
        )}

        {choice ? (
          // <i class="fa-solid fa-user-large-slash"></i>
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
      {/* {renderIcons()} */}
      {/* <footer>
        <h4>Haaai</h4>
      </footer> */}
    </div>
  );
};

export default Other;
