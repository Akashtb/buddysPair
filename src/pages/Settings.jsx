import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";



function Settings({ Se }) {
    return (
        <div>
            <div>
                <Header  title={Se} />
            </div>
            <div className="grid grid-cols-1 mt-6">
                <div className="grid grid-cols-3">
                    <div><img src="/mohanlal.jpeg" alt="" className="mx-36 rounded-full h-24"></img></div>
                    <div><p className="grid font-bold">Mohanlal</p></div>
                    <div><img src="/qrcode.png" alt="" className="h-24"></img></div>
                </div>
                <div className="grid grid-cols-2 mt-6">
                    <div><img src="/key-solid.svg" alt="" className="h-7 mx-52"></img>1</div>
                    <div className="grid grid-cols-1">
                    <div><h3 className="font-bold">Account</h3></div>
                    <div>Privacy</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-8">
                    <div><img src="/chat-icon-comments-icon-11553508047pnx3f5bvsr.png" alt="" className="h-7 mx-52"></img>1</div>
                    <div className="grid grid-cols-1">
                    <div className="font-bold">Chat</div>
                    <div>Chat History</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-8">
                    <div><img src="/bell.png" alt="" className="h-7 mx-52"></img>1</div>
                    <div className="grid grid-cols-1">
                    <div className="font-bold">Notifications</div>
                    <div>Messages</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-8">
                    <div><img src="/questio-mark.png" alt="" className="h-7 mx-52"></img>1</div>
                    <div className="grid grid-cols-1">
                    <div className="font-bold">Help</div>
                    <div>Help center</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-8">
                    <div><img src="/arrow.png" alt="" className="h-7 mx-52"></img>1</div>
                    <div className="grid grid-cols-1">
                    <div className="font-bold">Storage and data</div>
                    <div>Network usage</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-8">
                    <div><img src="/dualman.png" alt="" className="h-7 mx-52"></img>1</div>
                    <div className="grid grid-cols-1">
                    <div className="font-bold"> Invite a friend</div>
                    <div></div>
                    </div>
                </div>

            </div>
            <div>           
                 <Footer/>
            </div>
        </div>

    )
}

export default Settings;
