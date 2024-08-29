import React, { useContext, useEffect, useState } from 'react'
import IdContext from '../../context/IdContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Message({message}) {
    const [otherUserProfileId, setOtherUserProfileId] = useState(null);
    const [otherUserProfileData, setOtherUserProfileData] = useState(null);
    const { matrimonyProfileId } = useContext(IdContext);


    useEffect(() => {
        if (message) {
            const friendId = message.members.find((m) => m !== matrimonyProfileId);
            setOtherUserProfileId(friendId);
        }
    }, [message, matrimonyProfileId]);
    console.log(otherUserProfileId);

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

    console.log(otherUserProfileData);
    
    
  return (
    <div >
         <div key={message.id} className="message-item">
              <img src={otherUserProfileData?.profilePic} alt={otherUserProfileData?.firstName} className="avatar" />
              <div className="message-content">
                <div className="info">
                  <h2>{otherUserProfileData?.firstName}</h2>
                </div>
                {/* <div className="last-message">{message.lastMessage}</div> */}
              </div>
              {/* <span className="message-time">{message.time}</span> */}
            </div>
    </div>
  )
}

export default Message