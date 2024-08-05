import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/NotifyHeader/Header';
import Footer from '../../components/Footer/Footer';
import './Filter.css';
import BuddyHomeFooter from '../../components/BuddyHomeFooter/BuddyHomeFooter';

const Filter = () => {
    const [sortSelection, setSortSelection] = useState({
        newestMembers: false,
        lastActive: false,
        location: false
    });

    const [filterSelection, setFilterSelection] = useState({
        gender: false,
        age: false,
        location: false,
        interestsHobbies: false,
        religion: false
    });

    const handleSortClick = (key) => {
        setSortSelection((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFilterClick = (key) => {
        setFilterSelection((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="filter-container">
            <div className="filter-header">
                <Header title="Filter" />
                <div className="filter-content">
                    <div className="filter-section">
                        <h3>Sort By</h3>
                        <ul>
                            {Object.keys(sortSelection).map((key) => (
                                <li key={key} onClick={() => handleSortClick(key)}>
                                    <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <FontAwesomeIcon
                                        icon={sortSelection[key] ? faTimesCircle : faCheckCircle}
                                        className="icon-tick"
                                    />
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
                                    <FontAwesomeIcon
                                        icon={filterSelection[key] ? faTimesCircle : faCheckCircle}
                                        className="icon-tick"
                                    />
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
            <div className='customFooter'> <BuddyHomeFooter/></div>
        </div>
    );
};

export default Filter;
