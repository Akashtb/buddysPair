import React, { useContext } from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';
import { SocketMessageContext } from '../../context/SocketMessageContext';
 
function AcceptRequest({acceptedUserName,acceptedTime,requestToId}) {
    const {acceptedRequest, setAcceptedRequest} = useContext(SocketMessageContext)
    const formattedTime = formatDate(acceptedTime);

    const handleRemoveAccept = ()=>{
        const filterAcceptNotification = acceptedRequest.filter(accept=>accept.requestToId !== requestToId)
        setAcceptedRequest(filterAcceptNotification)
    }
    return (
        <div className="BuddyNotification2">
            <div className="BuddyNotification2Content">
                <div className='TickAndMessageContainer'>
                    <div className="TickAndMessage">
                        <img src={tick} alt="Tick" className='tick' />
                        <div className="message"> {`${acceptedUserName} has Accepted your Request`}</div>
                    </div>
                    <div className='time2'>{formattedTime}</div>
                </div>
                <span className="cross2">
                    <RxCross2 onClick={handleRemoveAccept}/>
                </span>
            </div>
        </div>
    )
}

export default AcceptRequest