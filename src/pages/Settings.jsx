// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";



// function Settings({ Se }) {
//     return (
//         <div>
//             <div>
//                 <Header  title={Se} />
//             </div>
//             <div className="grid grid-cols-1 mt-6">
//                 <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
//                     <div><img src="/mohanlal.jpeg" alt="" className="mx-36 rounded-full h-24"></img></div>
//                     <div className="mx-6"><p className="grid font-bold">Mohanlal</p></div>
//                     <div><img src="/qrcode.png" alt="" className="h-24"></img></div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-6">
//                     <div><img src="/key-solid.svg" alt="" className="h-7 mx-52"></img></div>
//                     <div className="grid grid-cols-1">
//                     <div><h3 className="font-bold">Account</h3></div>
//                     <div>Privacy</div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-8">
//                     <div><img src="/chat-icon-comments-icon-11553508047pnx3f5bvsr.png" alt="" className="h-7 mx-52"></img></div>
//                     <div className="grid grid-cols-1">
//                     <div className="font-bold">Chat</div>
//                     <div>Chat History</div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-8">
//                     <div><img src="/bell.png" alt="" className="h-7 mx-52"></img></div>
//                     <div className="grid grid-cols-1">
//                     <div className="font-bold">Notifications</div>
//                     <div>Messages</div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-8">
//                     <div><img src="/questio-mark.png" alt="" className="h-7 mx-52"></img></div>
//                     <div className="grid grid-cols-1">
//                     <div className="font-bold">Help</div>
//                     <div>Help center</div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-8">
//                     <div><img src="/arrow.png" alt="" className="h-7 mx-52"></img></div>
//                     <div className="grid grid-cols-1">
//                     <div className="font-bold">Storage and data</div>
//                     <div>Network usage</div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-8">
//                     <div><img src="/dualman.png" alt="" className="h-7 mx-52"></img></div>
//                     <div className="grid grid-cols-1">
//                     <div className="font-bold"> Invite a friend</div>
//                     <div></div>
//                     </div>
//                 </div>

//             </div>
//             <div>           
//                  <Footer/>
//             </div>
//         </div>

//     )
// }

// export default Settings;

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Settings({ Se }) {
    return (
        <div className="min-h-screen bg-white">
            <Header title={Se} />
            
            <main className="container mx-auto px-4 py-6">
                {/* Profile Section */}
                <section className="flex flex-col items-center mt-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between sm:space-x-4">
                        <img src="/mohanlal.jpeg" alt="Profile" className="w-24 h-24 rounded-full"/>
                        <div className="text-center sm:text-left">
                            <p className="font-bold text-lg">Mohanlal</p>
                        </div>
                        <img src="/qrcode.png" alt="QR Code" className="w-24 h-24"/>
                    </div>
                </section>

                {/* Settings Options */}
                <section className="mt-8 space-y-6">
                    <SettingOption 
                        icon="/key-solid.svg" 
                        title="Account" 
                        description="Privacy" 
                    />
                    <SettingOption 
                        icon="/chat-icon-comments-icon-11553508047pnx3f5bvsr.png" 
                        title="Chat" 
                        description="Chat History" 
                    />
                    <SettingOption 
                        icon="/bell.png" 
                        title="Notifications" 
                        description="Messages" 
                    />
                    <SettingOption 
                        icon="/questio-mark.png" 
                        title="Help" 
                        description="Help center" 
                    />
                    <SettingOption 
                        icon="/arrow.png" 
                        title="Storage and data" 
                        description="Network usage" 
                    />
                    <SettingOption 
                        icon="/dualman.png" 
                        title="Invite a friend" 
                        description="" 
                    />
                </section>
            </main>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
    
</div>

            
            <Footer />
        </div>
    );
}

function SettingOption({ icon, title, description }) {
    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
            <img src={icon} alt={title} className="w-7 h-7"/>
            <div>
                <p className="font-bold sm:font-bold md:font-bold lg:font-bold">{title}</p>
                {description && <p className="text-gray-600">{description}</p>}
            </div>
        </div>
    );
}

export default Settings;

