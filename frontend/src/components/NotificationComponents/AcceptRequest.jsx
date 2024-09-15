import React from 'react'
import tick from '../../assets/buddysHome/success icon.svg';
import { RxCross2 } from "react-icons/rx";
import { formatDate } from '../../utils/FormDate';

function AcceptRequest({acceptedUserName,acceptedTime}) {
    const formattedTime = formatDate(acceptedTime);
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
                    <RxCross2 />
                </span>
            </div>
        </div>
    )
}

export default AcceptRequest