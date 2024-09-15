import React from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';

function ReceviedRequest({RequestedUserName,requestTime}) {
   
    const formattedTime = formatDate(requestTime);

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
            <RxCross2 />
        </span>
    </div>
</div>
  )
}

export default ReceviedRequest