import React, { useContext, useEffect, useState } from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';
import { SocketMessageContext } from '../../context/SocketMessageContext';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import { useNavigate } from 'react-router-dom';

function ReceivedMessage({ senderName, createdAt, count, senderId }) {
    const { socketMessage, setSocketMessage } = useContext(SocketMessageContext)
    const navigate = useNavigate();


    const removeReceviedMessage = (e) => {
        e.stopPropagation(); 
        const remove = socketMessage.filter(message => message.senderId !== senderId);
        setSocketMessage(remove);
    }


    const navigateToChat = () => {
        navigate(`/message`);
        const remove = socketMessage.filter(message => message.senderId !== senderId);
        setSocketMessage(remove);
    }


    return (
        <div className="BuddyNotification2" onClick={navigateToChat}>
            <div className="BuddyNotification2Content" >
                <div className='TickAndMessageContainer'>
                    <div className="TickAndMessage">
                        <img src={tick} alt="Tick" className='tick' />
                        <div className="message">{`${senderName} ${count} New message`}</div>
                    </div>
                    <div className='time2'>{createdAt}</div>
                </div>
                <span className="cross2">
                    <RxCross2 onClick={removeReceviedMessage} />
                </span>
            </div>
        </div>)
}

export default ReceivedMessage