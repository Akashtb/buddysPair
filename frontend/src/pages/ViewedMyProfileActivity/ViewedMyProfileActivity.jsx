import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './ViewedMyProfileActivity.css';
import { useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ViewedMyProfileActivity = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for errors

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);

  useEffect(() => {
    const fetchSentRequests = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      try {
        const response = await axiosPrivate.get(`/api/matrimony/profile/viewedList/${matrimonyProfileId}`);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching sent requests or profiles:", error);
        setError("Failed to fetch profiles."); // Set error message
      } finally {
        setLoading(false);
      }
    };
    fetchSentRequests();
  }, [axiosPrivate, matrimonyProfileId]);

  const groupedUsers = profiles.reduce((acc, user) => {
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
            title="Viewed My Profile"
            profilePic="assets/Images/propic1.jpg"
            onProfilePicClick={toggleProfileOptions}
          />
        </div>
        <div className="user-list">
          {loading ? (
            <LoadingSpinner />
          ) : error ? ( // Render error message if there is one
            <div className="error-message">{error}</div>
          ) : profiles.length === 0 ? (
            <div className="no-data-message">
              <p>No profiles viewed yet.</p>
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

export default ViewedMyProfileActivity;
