import React, { useState } from 'react';
import Header from '../../components/NotifyHeader/Header';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';
import { SiTicktick } from 'react-icons/si';
import RightSideBar from '../../components/Rightsidebar/Rightsidebar';
import './Filter.css';

const Filter = () => {
    const [sortSelection, setSortSelection] = useState({
        newestMembers: false,
        lastActive: false,
        location: false,
    });

    const [filterSelection, setFilterSelection] = useState({
        gender: false,
        age: false,
        location: false,
        interestsHobbies: false,
        religion: false,
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSortClick = (key) => {
        setSortSelection((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFilterClick = (key) => {
        setFilterSelection((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="container">
            <div className="sidebar-toggle-button" onClick={toggleSidebar}>
                ☰
            </div>
            <div className="leftsidebar"><BuddyHomeFooter /></div>
            <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
                <Header title="Filter" />
                <div className="filter-content">
                    <div className="filter-section">
                        <h3>Sort By</h3>
                        <ul>
                            {Object.keys(sortSelection).map((key) => (
                                <li key={key} onClick={() => handleSortClick(key)}>
                                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <SiTicktick />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="filter-section">
                        <h3>Filter By</h3>
                        <ul>
                            {Object.keys(filterSelection).map((key) => (
                                <li key={key} onClick={() => handleFilterClick(key)}>
                                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <SiTicktick />
                                </li>
                            ))}
                        </ul>
                        <div className="filter-footer">
                            <button className="cancel-button">Cancel</button>
                            <button className="apply-button">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`right-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <RightSideBar />
            </div>
        </div>
    );
};

export default Filter;
