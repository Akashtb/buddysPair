import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './Contacted.css';
import { useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import IdContext from '../../context/IdContext';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'; // Import your loading spinner

const Contacted = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [contactedProfiles, setContactedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  useEffect(() => {
    const fetchContactedProfiles = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(`/api/matrimony/conversation/getContactedProfile/${matrimonyProfileId}`);
        setContactedProfiles(response.data);
      } catch (error) {
        console.error("Error fetching contacted profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactedProfiles();
  }, [axiosPrivate, matrimonyProfileId]);

  const groupedUsers = contactedProfiles.reduce((acc, user) => {
    const firstLetter = user.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
   
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <Header 
            title="Contacted" 
            profilePic="assets/Images/propic1.jpg" 
            onProfilePicClick={toggleProfileOptions} 
          />
        </div>
        <div className="user-list">
          {loading ? (
            <LoadingSpinner />
          ) : contactedProfiles.length === 0 ? (
            <div className="no-data-message">
              <p>No contacted profiles found.</p>
            </div>
          ) : (
            Object.keys(groupedUsers).sort().map(letter => (
              <div key={letter}>
                <h2 className="letter-heading">{letter}</h2>
                {groupedUsers[letter].map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    actions={[]}
                  />
                ))}
              </div>
            ))
          )}
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

export default Contacted;
