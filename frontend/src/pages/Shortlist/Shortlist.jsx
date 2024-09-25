import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './Shortlist.css';
import { useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'; // Import your loading spinner

const Shortlist = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [shortListedProfiles, setShortListedProfiles] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);

  useEffect(() => {
    const fetchShortlistedRequests = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosPrivate.get(`/api/matrimony/profile/shortListedList/${matrimonyProfileId}`);
        const shortListedList = response.data;

        // Check if the response is an array
        if (Array.isArray(shortListedList)) {
          const profilesPromises = shortListedList.map(shortList =>
            axiosPrivate.get(`/api/matrimony/profile/getProfile/${shortList.toUID}`)
          );

          const profilesResponses = await Promise.all(profilesPromises);
          const profiles = profilesResponses.map(res => res.data);

          setShortListedProfiles(profiles);
        } else {
          console.error('shortListedList is not an array:', shortListedList);
        }
      } catch (error) {
        console.error("Error fetching shortlisted profiles:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchShortlistedRequests();
  }, [axiosPrivate, matrimonyProfileId]);

  const groupedUsers = shortListedProfiles.reduce((acc, user) => {
    const firstLetter = user.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>

      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <Header 
            title="Shortlist" 
            profilePic="assets/Images/propic1.jpg" 
            onProfilePicClick={toggleProfileOptions} 
          />
        </div>

        <div className="user-list">
          {loading ? (
            <LoadingSpinner /> // Show spinner while loading
          ) : shortListedProfiles.length === 0 ? (
            <div className="no-data-message">
              <p>No shortlisted profiles found.</p>
            </div>
          ) : (
            Object.keys(groupedUsers).sort().map(letter => (
              <div key={letter}>
                <h2 className="letter-heading">{letter}</h2>
                {groupedUsers[letter].map(user => (
                  <UserCard
                    key={user.id} // Ensure you use the correct key
                    user={user}
                    actions={[
                      // Add action icons here if needed
                    ]}
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

export default Shortlist;
