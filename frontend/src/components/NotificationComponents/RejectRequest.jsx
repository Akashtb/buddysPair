import React from 'react'
import { RxCross2 } from "react-icons/rx";
import error from '../../assets/buddysHome/error icon.svg';
import { formatDate } from '../../utils/FormDate';
function RejectRequest({rejectedUserName,rejectedTime}) {
  const formattedTime = formatDate(rejectedTime);
  return (
    <div className="BuddyNotification2">
    <div className="BuddyNotification2Content">
      <div className='TickAndMessageContainer'>
        <div className="TickAndMessage">
          <img src={error} alt="Tick" className='tick' />
          <div className="message">{`${rejectedUserName} has rejected you`}</div>
        </div>
        <div className='time2'>{formattedTime}</div>
      </div>
      <span className="cross2">
        <RxCross2 />
      </span>
    </div>
  </div>
  )
}

export default RejectRequest