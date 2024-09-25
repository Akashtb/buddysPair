import React, { useContext, useEffect, useState } from 'react'
import IdContext from '../../context/IdContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../../context/SocketContext';

function RecentConversation({ message,conversationArray,setConversationArray}) {
  const [otherUserProfileId, setOtherUserProfileId] = useState(null);
  const [otherUserProfileData, setOtherUserProfileData] = useState(null);
  const { matrimonyProfileId } = useContext(IdContext);
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate();


  useEffect(() => {
    if (message) {
      const friendId = message.members.find((m) => m !== matrimonyProfileId);
      setOtherUserProfileId(friendId);
    }
  }, [message, matrimonyProfileId]);
  console.log("otherUserProfileId in recent messages", otherUserProfileId);

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


  useEffect(() => {
    if (socket.current) {
      const handleBlocked = ({ userId, userFullName }) => {
        if (userId === otherUserProfileId) {
          const updatedConversations = conversationArray.filter(conversation => 
            !conversation.members.includes(otherUserProfileId)
          );
          setConversationArray(updatedConversations);
          console.log("Blocked:", userFullName);
        }
      };
  
      const handleUnFriend = ({ userId, userFullName }) => {
        if (userId === otherUserProfileId) {
          const updatedConversations = conversationArray.filter(conversation => 
            !conversation.members.includes(otherUserProfileId)
          );
          setConversationArray(updatedConversations);
          console.log("Blocked:", userFullName);
        }
      };
      socket.current.on('blocked', handleBlocked);
      socket.current.on('unfriend',handleUnFriend)
  
      return () => {
        socket.current.off('blocked', handleBlocked);
        // Clean up other listeners if needed
      };
    }
  }, [socket.current, matrimonyProfileId, otherUserProfileId, conversationArray]);
  
  console.log("conversationArray in recentconversation",conversationArray);

  const navigateToChat = (conversationArrayId, friendId, coversationDetails) => {
    navigate(`/chat`, { state: { conversationArrayId, friendId, coversationDetails } });
  }

  return (
    <>
      <img src={otherUserProfileData?.profilePic} alt="Match 2" onClick={() => navigateToChat(message?._id, otherUserProfileId, message)} />
    </>
  )
}

export default RecentConversation