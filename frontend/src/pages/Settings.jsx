import React from "react";
import Header2edit from "../components/Header2editAyas";
import Footer from "../components/FooterAyas";
import Sidebar from "../components/SidebarAyas"; // Import Sidebar
import { useNavigate } from "react-router-dom";

function Settings({ Se }) {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header2edit title={Se} />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-8  ">
                    <div className="relative grid grid-cols-1 h-24">
                        <div className="">
                            <p className="absolute left-4">
                                <img src="/assets/Images/mohanlal.jpeg" alt="" className="h-16 rounded-full sm:ml-6" />
                            </p>
                        </div>
                        <div>
                            <p className="absolute left-24 -mt-8 font-bold sm:ml-12">Mohanlal</p>
                            <p className="absolute left-24 text-sm sm:ml-12">Never give up</p>
                        </div>
                        <div className="">
                            <p className="absolute md:right-20 sm:absolute right-2">
                                <img src="/assets/Images/qrcode.png" alt="e" className="h-16 rounded-full -mt-16" />
                            </p>
                        </div>
                    </div>

                    <main className="container mt-8">
                        <section>
                            <SettingOption
                                icon="/assets/Images/key-solid.svg"
                                title="Account"
                                description="Privacy"
                                path="/privacySetting" // Pass the path as a prop
                            />
                            <SettingOption
                                icon="/assets/Images/chat-icon-comments-icon-11553508047pnx3f5bvsr.png"
                                title="Chat"
                                description="Chat History"
                            />
                            <SettingOption
                                icon="/assets/Images/bell.png"
                                title="Notifications"
                                description="Messages"
                            />
                            <SettingOption
                                icon="/assets/Images/questio-mark.png"
                                title="Help"
                                description="Help center"
                            />
                            <SettingOption
                                icon="/assets/Images/arrow.png"
                                title="Storage and data"
                                description="Network usage"
                            />
                            <SettingOption
                                icon="/assets/Images/dualman.png"
                                title="Invite a friend"
                                description=""
                            />
                        </section>
                    </main>
                </div>
            </div>

            {/* Footer */}
            <footer className="container bg-white text-white p-4 fixed mb-0 bottom-0 ">
                <Footer />
            </footer>
        </div>
    );
}

function SettingOption({ icon, title, description, path }) {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md mb-4 cursor-pointer"
            onClick={() => path && navigate(path)} // Navigate to the specified path on click
        >
            <img src={icon} alt={title} className="w-7 h-7" />
            <div>
                <p className="font-bold">{title}</p>
                {description && <p className="text-gray-600">{description}</p>}
            </div>
        </div>
    );
}

export default Settings;
