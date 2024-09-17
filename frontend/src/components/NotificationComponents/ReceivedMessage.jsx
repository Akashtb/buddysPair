import React, { useContext } from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';
import { SocketMessageContext } from '../../context/SocketMessageContext';
function ReceivedMessage({senderName,createdAt,count,senderId}) {
    const {socketMessage, setSocketMessage} = useContext(SocketMessageContext)

    const removeReceviedMessage = ()=>{
        const remove = socketMessage.filter(message => message.senderId !== senderId)
        setSocketMessage(remove)
    }
  return (
    <div className="BuddyNotification2">
    <div className="BuddyNotification2Content">
        <div className='TickAndMessageContainer'>
            <div className="TickAndMessage">
                <img src={tick} alt="Tick" className='tick' />
                <div className="message">{`${senderName} ${count} New message`}</div>
            </div>
            <div className='time2'>{createdAt}</div>
        </div>
        <span className="cross2">
            <RxCross2 onClick={removeReceviedMessage}/>
        </span>
    </div>
</div>  )
}

export default ReceivedMessage