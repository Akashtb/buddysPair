import React from 'react'
import { RxCross2 } from "react-icons/rx";
function News() {
    return (
    
            <div className="BuddyNotification1">
                <div className="BuddyNotification1Body">
                    <div className="BuddyNotification1BodyContent">
                        <div className="headingandCross1">
                            <span className='heading1'>News</span>
                            <span className='cross1'><RxCross2 /></span>
                        </div>
                        <div className="contentBody1">
                            <span className="contentBody1title">News Title</span>
                            <span className="contentBody1content">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores nesciunt fugit quas qui architecto, ea atque fugiat consequuntur, temporibus quo omnis? Vero earum, consequatur soluta optio enim perspiciatis delectus nulla.
                            </span>
                            <span className="contentBody1timeOne">Today 10:30PM</span>
                        </div>
                    </div>
                </div>
            </div>
   
    )
}

export default News