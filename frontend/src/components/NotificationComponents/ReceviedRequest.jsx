import React, { useContext } from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';
import { SocketMessageContext } from '../../context/SocketMessageContext';

function ReceviedRequest({RequestedUserName,requestTime,fromUID}) {
    const {setReceivedRequest,receivedRequest} = useContext(SocketMessageContext)
   
    const formattedTime = formatDate(requestTime);
    const handleRemoveRequest = () => {
        const updatedRequests = receivedRequest.filter(request => request.fromUID !== fromUID);
        setReceivedRequest(updatedRequests);
    };
 
  return (
    <div className="BuddyNotification2">
    <div className="BuddyNotification2Content">
        <div className='TickAndMessageContainer'>
            <div className="TickAndMessage">
                <img src={tick} alt="Tick" className='tick' />
                <div className="message">{`${RequestedUserName} has sent you a request`}</div>
            </div>
            <div className='time2'>{formattedTime}</div>
        </div>
        <span className="cross2">
            <RxCross2 onClick={handleRemoveRequest}/>
        </span>
    </div>
</div>
  )
}

export default ReceviedRequest