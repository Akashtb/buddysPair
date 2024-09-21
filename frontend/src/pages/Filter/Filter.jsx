import { useContext, useState } from 'react';
import Header from '../../components/NotifyHeader/Header';
import { SiTicktick } from 'react-icons/si';
import './Filter.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import { useNavigate } from 'react-router-dom';

const Filter = () => {
    const navigate = useNavigate()
    const [sortSelection, setSortSelection] = useState({
        newestMembers: false,
        lastActive: false,
        age: false,
    });

    const [filterSelection, setFilterSelection] = useState({
        gender: false,
        district: false,
        interestsHobbies: false,
        religion: false,
    });

    const [sortSubSelection, setSortSubSelection] = useState({
        newestMembers: "all",
        lastActive: "today",
        age: { min: 18, max: 35 }
    });
    const [filterSubSelection, setFilterSubSelection] = useState({
        gender: "all",
        district: "all",
        interestsHobbies:"sports",
        religion:"all"
    });

    const axiosPrivate = useAxiosPrivate()
    const { matrimonyProfileId } = useContext(IdContext);


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [visibleSubSelection, setVisibleSubSelection] = useState(null);


    const keralaDistricts = [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasargod',
        'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
        'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
    ];
    const toggleProfileOptions = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setShowProfileOptions(!showProfileOptions);
    };

    const handleSortClick = (key) => {
        setSortSelection((prev) => ({ ...prev, [key]: !prev[key] }));
        setVisibleSubSelection(key);
    };

    const handleFilterClick = (key) => {
        setFilterSelection((prev) => ({ ...prev, [key]: !prev[key] }));
        setVisibleSubSelection(key);
    };

    const handleSortSubSelection = (key, value) => {
        setSortSubSelection((prev) => ({ ...prev, [key]: value }));
        setVisibleSubSelection(null);
    };

    const handleFilterSubSelection = (key, value) => {
        setFilterSubSelection((prev) => ({ ...prev, [key]: value }));
        setVisibleSubSelection(null);
    };

    const handleAgeChange = (key, minOrMax, value) => {
        setSortSubSelection((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [minOrMax]: value,
            },
        }));
    };

    const handleApply = async () => {
        const appliedFilters = {
            gender: filterSubSelection.gender,
            age: sortSubSelection.age,
            district: filterSubSelection.district,
            interestsHobbies: filterSubSelection.interestsHobbies,
            newestMembers: sortSubSelection.newestMembers,
            lastActive: sortSubSelection.lastActive,
            religion: filterSubSelection.religion,
        };
    
        console.log('Applied Filters:', appliedFilters);
    
        try {
            const response = await axiosPrivate.put(`/api/matrimony/profile/updateFilter/${matrimonyProfileId}`, appliedFilters);
            navigate('/locationSorting', { state: { message: "Filter" } });
        } catch (error) {
            console.error('Error applying filter:', error);
        }
    };
    console.log(sortSelection);

    console.log(filterSelection);


    return (
        <div className="activitycontainer">
            <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
                <LeftSideBar />
            </div>
            <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
                <div className="activity-header">
                    <Header
                        title="Filter"
                        profilePic="assets/Images/propic1.jpg"
                        onProfilePicClick={toggleProfileOptions}
                    />
                </div>
                <div className="filter-content">
                    <div className="filter-section">
                        <h3>Sort By</h3>
                        <ul>
                            {Object.keys(sortSelection).map((key) => (
                                <li key={key}>
                                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <SiTicktick
                                        onClick={() => handleSortClick(key)}
                                        className="tick-icon"
                                    />
                                    {visibleSubSelection === key && key === 'age' && (
                                        <div className="filter-subselection">
                                            <label>Min Age:</label>
                                            <input
                                                type="number"
                                                value={sortSubSelection[key]?.min || ''}
                                                onChange={(e) => handleAgeChange(key, 'min', e.target.value)}
                                            />
                                            <label>Max Age:</label>
                                            <input
                                                type="number"
                                                value={sortSubSelection[key]?.max || ''}
                                                onChange={(e) => handleAgeChange(key, 'max', e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {visibleSubSelection === key && key !== 'age' && (
                                        <div className="filter-subselection">
                                            <select
                                                value={sortSubSelection[key] || ''}
                                                onChange={(e) => handleSortSubSelection(key, e.target.value)}
                                            >
                                                {key === 'newestMembers' && (
                                                    <>
                                                        <option value="all">All</option>
                                                        <option value="thisWeek">This Week</option>
                                                        <option value="thisMonth">This Month</option>
                                                    </>
                                                )}
                                                {key === 'lastActive' && (
                                                    <>
                                                        <option value="today">Today</option>
                                                        <option value="thisWeek">This Week</option>
                                                        <option value="thisMonth">This Month</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="filter-section">
                        <h3>Filter By</h3>
                        <ul>
                            {Object.keys(filterSelection).map((key) => (
                                <li key={key}>
                                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <SiTicktick
                                        onClick={() => handleFilterClick(key)}
                                        className="tick-icon"
                                    />
                                    {visibleSubSelection === key && (
                                        <div className="filter-subselection">
                                            <select
                                                value={filterSubSelection[key] || ''}
                                                onChange={(e) => handleFilterSubSelection(key, e.target.value)}
                                            >
                                                {key === 'gender' && (
                                                    <>
                                                        <option value="all">All</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </>
                                                )}
                                                {key === 'district' && (
                                                    <>
                                                        <label>Locations</label>
                                                        <option value="all">All</option>
                                                        {keralaDistricts.map(district => (
                                                            <option key={district} value={district}>
                                                                {district}
                                                            </option>
                                                        ))}

                                                    </>
                                                )}
                                                {key === 'interestsHobbies' && (
                                                    <>
                                                        <option value="sports">Sports</option>
                                                        <option value="music">Music</option>
                                                        <option value="reading">Reading</option>
                                                        <option value="traveling">Traveling</option>
                                                    </>
                                                )}
                                                {key === 'religion' && (
                                                    <>
                                                        <option value="all">All</option>
                                                        <option value="Christian">Christianity</option>
                                                        <option value="Islam">Islam</option>
                                                        <option value="Hindu">Hinduism</option>
                                                        <option value="Other">Other</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="filter-footer">
                            <button className="cancel-button">Cancel</button>
                            <button className="apply-button" onClick={handleApply}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>

            {showProfileOptions && (
                <div className="profileOptionsContainer">
                    <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
                </div>
            )}
        </div>
    );
};

export default Filter;