import { useContext, useEffect, useState } from 'react';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './RejectPage.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'; // Import the spinner

const RejectPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [rejectedProfiles, setRejectedProfiles] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);

  useEffect(() => {
    const fetchRejectedRequests = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosPrivate.get(`/api/matrimony/profile/listOfRejection/${matrimonyProfileId}`);
        const rejectedList = response.data;

        const profilesPromises = rejectedList.map(reject =>
          axiosPrivate.get(`/api/matrimony/profile/getProfile/${reject.toUID}`)
        );

        const profilesResponses = await Promise.all(profilesPromises);
        const profiles = profilesResponses.map(res => res.data);
        setRejectedProfiles(profiles);
      } catch (error) {
        console.error("Error fetching sent requests or profiles:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchRejectedRequests();
  }, [axiosPrivate, matrimonyProfileId]);

  const groupedUsers = rejectedProfiles.reduce((acc, user) => {
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
            title="Reject" 
            profilePic="assets/Images/propic1.jpg" 
            onProfilePicClick={toggleProfileOptions} 
          />
        </div>
        <div className="user-list">
          {loading ? (
            <LoadingSpinner /> // Show spinner while loading
          ) : rejectedProfiles.length === 0 ? (
            <div className="no-data-message">
              <p>No rejected profiles found.</p>
            </div>
          ) : (
            Object.keys(groupedUsers).sort().map(letter => (
              <div key={letter}>
                <h2 className="letter-heading">{letter}</h2>
                {groupedUsers[letter].map(user => (
                  <UserCard key={user._id} user={user} actions={[]} />
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

export default RejectPage;
