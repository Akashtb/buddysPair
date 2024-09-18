import React, { useContext } from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';
import { SocketMessageContext } from '../../context/SocketMessageContext';
import { useNavigate } from 'react-router-dom';
 
function AcceptRequest({acceptedUserName,acceptedTime,requestToId}) {
    const {acceptedRequest, setAcceptedRequest} = useContext(SocketMessageContext)
    const formattedTime = formatDate(acceptedTime);
    const navigate = useNavigate()

    const handleRemoveAccept = (e)=>{
        e.stopPropagation(); 
        const filterAcceptNotification = acceptedRequest.filter(accept=>accept.requestToId !== requestToId)
        setAcceptedRequest(filterAcceptNotification)
    }

    const navigateToAccept = () => {
        navigate(`/accept`);
        setAcceptedRequest([])
    }

    
    return (
        <div className="BuddyNotification2" onClick={navigateToAccept}>
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