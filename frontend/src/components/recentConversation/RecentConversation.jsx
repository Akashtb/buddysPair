import React, { useContext, useEffect, useState } from 'react'
import IdContext from '../../context/IdContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecentConversation({message}) {
  const [otherUserProfileId, setOtherUserProfileId] = useState(null);
  const [otherUserProfileData, setOtherUserProfileData] = useState(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const navigate = useNavigate();

  const navigateToChat = (conversationArrayId, friendId,coversationDetails) => {
    navigate(`/chat`, { state: { conversationArrayId, friendId,coversationDetails}});
  }

  useEffect(() => {
    if (message) {
        const friendId = message.members.find((m) => m !== matrimonyProfileId);
        setOtherUserProfileId(friendId);
    }
}, [message, matrimonyProfileId]);
console.log("otherUserProfileId in recent messages",otherUserProfileId);

useEffect(() => {
  const fetchProfileDataOfOtherUser = async () => {
      if (otherUserProfileId) {
          try {
              const response = await axios.get(`http://localhost:8003/api/matrimony/profile/getProfile/${otherUserProfileId}`);
              setOtherUserProfileData(response.data);
          } catch (error) {
              console.error('Failed to fetch profile:', error);
          }
      }
  };
  fetchProfileDataOfOtherUser();
}, [otherUserProfileId]);

console.log("otherUserProfileData in recent messages",otherUserProfileData);

  return ( 
    <>
         <img src={otherUserProfileData?.profilePic} alt="Match 2" onClick={() => navigateToChat(message?._id, otherUserProfileId,message)}/>
    </>
  )
}

export default RecentConversation