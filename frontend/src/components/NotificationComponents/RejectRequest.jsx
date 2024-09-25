import React, { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import error from '../../assets/buddysHome/error icon.svg';
import { formatDate } from '../../utils/FormDate';
import { SocketMessageContext } from '../../context/SocketMessageContext';
function RejectRequest({rejectedUserName,rejectedTime,requestToId}) {
  const{rejectRequest, setRejectedRequest} = useContext(SocketMessageContext)
  const formattedTime = formatDate(rejectedTime);

  const removeRejectionNotification = (e)=>{
    e.stopPropagation();
    const remove = rejectRequest.filter(reject=>reject.requestToId !== requestToId)
    setRejectedRequest(remove)
  }

  const navigateToReject=()=>{
    navigate(`/reject`);
    setReceivedRequest([]);
}
  return (
    <div className="BuddyNotification2"onClick={navigateToReject}>
    <div className="BuddyNotification2Content">
      <div className='TickAndMessageContainer'>
        <div className="TickAndMessage">
          <img src={error} alt="Tick" className='tick' />
          <div className="message">{`${rejectedUserName} has rejected you`}</div>
        </div>
        <div className='time2'>{formattedTime}</div>
      </div>
      <span className="cross2">
        <RxCross2 onClick={removeRejectionNotification}/>
      </span>
    </div>
  </div>
  )
}

export default RejectRequest