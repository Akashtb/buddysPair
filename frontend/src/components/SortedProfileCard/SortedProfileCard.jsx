import React, { useContext, useEffect, useState } from 'react';
import './ProfileCard.css';
import { LuMessageCircle } from "react-icons/lu";
import { AiOutlineLike, AiOutlineDislike, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { RiUserForbidLine } from "react-icons/ri";
import { PiUserCheckLight } from "react-icons/pi";
import { FiUserCheck } from "react-icons/fi";
import { LuUserX } from "react-icons/lu";
import noUser from '../../assets/buddysHome/no image.webp'
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import { toast, useToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../../context/SocketContext'; 

const ProfileCard = ({ profile,nearByProfileList,setNearByProfileList,qulificationProfileList,setQualificationProfileList,designationProfileList,setDesignationProfileList}) => {
  // console.log(`profile ${profile.firstName} online status`, profile.isOnline);
  // console.log(`nearByProfileList in sortedProfileCard`,profile);
  // console.log(`qulificationProfileList in sortedProfileCard`, qulificationProfileList);
  // console.log(`designationProfileList in sortedProfileCard`, designationProfileList);

  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState({})
  const [nolikeIcon, SetNoLikeIcon] = useState(false)
  const [acceptOrReject, setAcceptOrReject] = useState(false)

  const navigate = useNavigate()
  const {socket} = useContext(SocketContext)
 
  const reDirectToProfile =()=>{
    navigate(`/other/${profile._id}`)
  }

  // console.log("socket in homepage",socket.current);
    
  useEffect(() => { 
    if (socket.current) {
      socket.current.on('requestReceived', ({ fromUID, toUID, fromUIDFullName }) => {  
        if (fromUID === profile._id) {
          // toast.info(`${fromUIDFullName} has sent you a request new.`);  
          setConnectionStatus(prev => ({ ...prev, status: 'pending' }));
        }
      });
  
      socket.current.on('cancelReceived', ({ fromUID, requestToId, fromUIDFullName }) => {        
        if (fromUID === profile._id) {
          // toast.info(`${fromUIDFullName} has cancel you a request new.`);
          setConnectionStatus(prev => ({ ...prev, status: 'not_found' }));
        }
      });

      socket.current.on('acceptRequest', ({ requestFromId, requestToId, toUIDFullName }) => {
        if (String(requestToId) === String(profile?._id)) {
          // toast.info(`${toUIDFullName} has accepted your request`);
          
          if (Array.isArray(nearByProfileList)) {
            const updatedNearByList = nearByProfileList.filter(p => String(p._id) !== String(requestToId));
            setNearByProfileList([...updatedNearByList]);  
          }
          if (Array.isArray(qulificationProfileList)) {
            const updatedQualificationList = qulificationProfileList.filter(p => String(p._id) !== String(requestToId));
            setQualificationProfileList([...updatedQualificationList]);
          } 
          if (Array.isArray(designationProfileList)) {
            const updatedDesignationList = designationProfileList.filter(p => String(p._id) !== String(requestToId));
            setDesignationProfileList([...updatedDesignationList]);
          }
        }
      });

      socket.current.on('rejectRequest',({requestFromId, requestToId, toUIDFullName })=>{
        if (String(requestToId) === String(profile?._id)) {
          // toast.info(`${toUIDFullName} has reject your request`)
          if (Array.isArray(nearByProfileList)) {
            const updatedNearByList = nearByProfileList.filter(p => String(p._id) !== String(requestToId));
            setNearByProfileList([...updatedNearByList]);  
          }
          if (Array.isArray(qulificationProfileList)) {
            const updatedQualificationList = qulificationProfileList.filter(p => String(p._id) !== String(requestToId));
            setQualificationProfileList([...updatedQualificationList]);
          } 
          if (Array.isArray(designationProfileList)) {
            const updatedDesignationList = designationProfileList.filter(p => String(p._id) !== String(requestToId));
            setDesignationProfileList([...updatedDesignationList]);
          }
        }
      })
  
      // Clean up listener on component unmount
      return () => {
        socket.current.off('requestReceived');
        socket.current.off('cancelReceived');
        socket.current.off('acceptRequest');
        socket.current.off('rejectRequest');
      };
    }
  }, [socket.current,profile._id,matrimonyProfileId]);
  


  useEffect(() => {
    const findConnectionStatus = async () => {
      try {
        const response = await axiosPrivate.get(`/api/matrimony/profile/connection-status/${matrimonyProfileId}/${profile._id}`);
        // console.log("connectionStatus", response);
        // console.log("acceptOrReject", acceptOrReject);

        setConnectionStatus(response.data)
      } catch (error) {
        console.error("Error fetching connection status:", error);
      }
    };

    findConnectionStatus();
  }, [axiosPrivate, matrimonyProfileId, profile, acceptOrReject]);

  useEffect(() => {
    const findShortList = async () => {
      try {
        const shortList = await axiosPrivate.get(`/api/matrimony/profile/shortListedListOfAUser/${matrimonyProfileId}/${profile._id}`);
        if (shortList.data.message === "shortlisted is found") {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error in finding the shortlist:", error);
      }
    };
    findShortList();
  }, [axiosPrivate, matrimonyProfileId, profile._id]);







  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        // Unshortlist the profile
        try {
          await axiosPrivate.delete(`/api/matrimony/profile/cancelshortListTheProfile/${matrimonyProfileId}/${profile._id}`);
          toast.success("you have sort out the user from the shorlist")
          setIsLiked(false);
        } catch (error) {
          console.error('Error unshortlisting profile:', error);
          toast.error("Failed to unshortlist the profile. Please try again later.");
        }
      } else {

        try {
          await axiosPrivate.post(`/api/matrimony/profile/shortListTheProfile/${matrimonyProfileId}`, {
            profileId: profile._id,
          });
          toast.success("you have shortlist the user")
          setIsLiked(true);
        } catch (error) {
          console.error('Error shortlisting profile:', error);

          if (error.response && error.response.data && error.response.data.message) {
            if (error.response.data.message === "You have already received a request from this user or you have sent request to this user") {
              toast.error("You have already made a connection request.");
            } else {
              toast.error(error.response.data.message);
            }
          } else {
            toast.error("Failed to shortlist the profile. Please try again later.");
          }
        }
      }
    } catch (error) {
      console.error('Unexpected error in handleLikeClick:', error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const handleRequestClick = async () => {
    try {
      if (isSentRequest) {
        // Unshortlist the profile
        try {
          await axiosPrivate.delete(`/api/matrimony/profile/cancelTheRequest/${matrimonyProfileId}?requestToId=${profile._id}`);
          toast.success("you have successfully cancel the send request")
          setIsSentRequest(false);
        } catch (error) {
          console.error('Error unshortlisting profile:', error);
          toast.error("Failed to cancel the request either you have accept or get reject");
        }
      } else {

        try {
          await axiosPrivate.post(`/api/matrimony/profile/sendRequest/${matrimonyProfileId}`, {
            toUID: profile._id,
          });
          toast.success("you have send Request successfully")
          setIsSentRequest(true);
          setIsLiked(false)
        } catch (error) {
          console.error('Error shortlisting profile:', error);

          if (error.response && error.response.data && error.response.data.message) {
            if (error.response.data.message === "You have already received a request from this user") {
              toast.error("You have already received a request from this user, please refresh the page");
            } else {
              toast.error(error.response.data.message);
            }
          } else {
            toast.error("Failed to shortlist the profile. Please try again later.");
          }
        }
      }
    } catch (error) {
      console.error('Unexpected error in handleLikeClick:', error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const getGenderAbbreviation = (gender) => {
    return gender === 'Female' ? 'F' : 'M';
  };

  const handleInfoRejected = () => {
    toast.error("Your request has been rejected by this user ")
  }

  const handleInfoFRejected = () => {
    toast.error("You rejected the request from this user ")
  }

  const handleReject = async () => {
    try {
      await axiosPrivate.post(`/api/matrimony/profile/rejectTheRequest/${matrimonyProfileId}`, { requestFromId: profile._id })
      if (Array.isArray(nearByProfileList)) {
        const updatedNearByList = nearByProfileList.filter(p => String(p._id) !== String(profile._id));
        setNearByProfileList([...updatedNearByList]);             
      } 
      if (Array.isArray(qulificationProfileList)) {
        const updatedQualificationList = qulificationProfileList.filter(p => String(p._id) !== String(profile._id));
        setQualificationProfileList([...updatedQualificationList]);
      } 
      if (Array.isArray(designationProfileList)) {
        const updatedDesignationList = designationProfileList.filter(p => String(p._id) !== String(profile._id));
        setDesignationProfileList([...updatedDesignationList]);
      }
      setAcceptOrReject(true)
      SetNoLikeIcon(true)
      toast.success("You have rejected the request successfully")
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error("User might cancel the request to check. Please Refresh the page.");
    }
  }



  const handleAccept = async () => {
    try {
      await axiosPrivate.post(`/api/matrimony/profile/acceptRequest/${matrimonyProfileId}`, { requestFromId: profile._id })
      if (Array.isArray(nearByProfileList)) {
        const updatedNearByList = nearByProfileList.filter(p => String(p._id) !== String(profile._id));
        setNearByProfileList([...updatedNearByList]);             
      } 
      if (Array.isArray(qulificationProfileList)) {
        const updatedQualificationList = qulificationProfileList.filter(p => String(p._id) !== String(profile._id));
        setQualificationProfileList([...updatedQualificationList]);
        console.log("filter is applied ........");
      } 
      if (Array.isArray(designationProfileList)) {
        const updatedDesignationList = designationProfileList.filter(p => String(p._id) !== String(profile._id));
        setDesignationProfileList([...updatedDesignationList]);
      }
      setAcceptOrReject(true)
      SetNoLikeIcon(true)
      toast.success("You have accepted the request successfully")
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error("User might cancel the request to check. Please Refresh the page.");
    }
  };

  useEffect(() => {
    const { status, fromUID } = connectionStatus;

    if (status === "pending" && fromUID === matrimonyProfileId) {
      setIsSentRequest(true);
    } else {
      setIsSentRequest(false);
    }
  }, [connectionStatus, matrimonyProfileId]);

  const renderIcons = () => {
    const { status, fromUID } = connectionStatus;

    if (status === "pending" && fromUID === matrimonyProfileId) {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleLikeClick}>
            {isLiked ? <AiOutlineDislike /> : <AiOutlineLike />}
          </span>
          <span className='profileCardIcon3' onClick={handleRequestClick}>
            {isSentRequest ? <MdOutlineCancelScheduleSend /> : <AiOutlineUsergroupAdd />}
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      );
    }

    if (status === "accepted" && fromUID === matrimonyProfileId) {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleLikeClick}>
            <IoHeartDislikeOutline />
          </span>
          <span className='profileCardIcon3'>
            <LuMessageCircle />
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      );
    }

    if (status === "rejected" && fromUID === matrimonyProfileId) {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleLikeClick}>
            <IoHeartDislikeOutline />
          </span>
          <span className='profileCardIcon3' onClick={handleInfoRejected}>
            <RiUserForbidLine />
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      );
    }

    if (status === "pending" && fromUID !== matrimonyProfileId) {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleReject}>
            <LuUserX />
            {/* {nolikeIcon ? <IoHeartDislikeOutline /> : <LuUserX />} */}
          </span>
          <span className='profileCardIcon3' onClick={handleAccept}>
            <FiUserCheck />
            {/* {acceptOrReject === 'initial' && <FiUserCheck />}
            {acceptOrReject === 'accept' && <LuMessageCircle onClick={handleInfoFRejected}/>}
            {acceptOrReject === 'reject' && <RiUserForbidLine onClick={handleInfoFRejected}/>} */}
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      )
    }

    if (status === "accepted" && fromUID !== matrimonyProfileId) {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleLikeClick}>
            <IoHeartDislikeOutline />
          </span>
          <span className='profileCardIcon3'>
            <LuMessageCircle />
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      )
    }

    if (status === "rejected" && fromUID !== matrimonyProfileId) {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleLikeClick}>
            <IoHeartDislikeOutline />
          </span>
          <span className='profileCardIcon3' onClick={handleInfoFRejected}>
            <RiUserForbidLine />
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      )
    }
    if (status === "not_found") {
      return (
        <>
          <span className='profileCardIcon3' onClick={handleLikeClick}>
            {isLiked ? <AiOutlineDislike /> : <AiOutlineLike />}
          </span>
          <span className='profileCardIcon3' onClick={handleRequestClick}>
            {isSentRequest ? <MdOutlineCancelScheduleSend /> : <AiOutlineUsergroupAdd />}
          </span>
          <span className='profileCardIcon3'><FaRegEye /></span>
        </>
      );
    }


    return null;
  };

  return (
    <div className="profileCardContainer3">
      <img src={profile?.profilePic || noUser} alt="" className='profileCardimageContainer3' onClick={reDirectToProfile}/>
      {profile?.isOnline === true ? (
       <div className='profileCardOnlineParentTag'> <span className='profileCardOnlineTag3'>Online</span></div>
      ) : (
        <div className='profileCardOfflineParentTag'> <span className='profileCardOnlineTag3'>Offline</span></div>
      )}
      <div className="profileCardIcons3">
        {renderIcons()}
      </div>
      <div className="profileCardNameAndAge3">
        <span className="profileName3">{profile?.firstName} {profile?.lastName}</span>
        <span className="profileAgeAndGender3">{getGenderAbbreviation(profile?.gender)} {profile?.age} YRS</span>
      </div>
      <div className='profileDesignationAndPlaceContainer3'>
        <span className="profileDesignationAndPlace3">{profile?.profession}, {profile?.district}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
