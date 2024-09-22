import { useContext, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './SentPage.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import { toast } from 'react-toastify';

const SentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [sentProfiles, setSentProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);

  useEffect(() => {
    const fetchSentRequests = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axiosPrivate.get(`/api/matrimony/profile/listOfSentRequest/${matrimonyProfileId}`);
        const requestList = response.data;

        if (requestList.length === 0) {
          setSentProfiles([]);
          return;
        }

        const profilesPromises = requestList.map(request =>
          axiosPrivate.get(`/api/matrimony/profile/getProfile/${request.toUID}`)
        );

        const profilesResponses = await Promise.all(profilesPromises);
        const profiles = profilesResponses.map(res => res.data);
        setSentProfiles(profiles);
      } catch (error) {
        setError('Error fetching sent requests or profiles.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchSentRequests();
  }, [axiosPrivate, matrimonyProfileId]);

  const groupedUsers = sentProfiles.reduce((acc, user) => {
    const firstLetter = user.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  const cancelTheRequest = async (toUId) => {
    try {
      const response = await axiosPrivate.delete(`/api/matrimony/profile/cancelTheRequest/${matrimonyProfileId}`, {
        params: { requestToId: toUId }
      });
      if (response.status === 200) {
        setSentProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== toUId));
        toast.success("successfully cancel the request")
      }
    } catch (error) {
      console.error('Error cancelling the request:', error);
    }
  };

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="activity-header">
          <Header 
            title="Sent" 
            profilePic="assets/Images/propic1.jpg" 
            onProfilePicClick={toggleProfileOptions} 
          />
        </div>

        <div className="user-list">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : sentProfiles.length === 0 ? (
            <div className="no-data-message">
              <p>No sent requests found.</p>
            </div>
          ) : (
            Object.keys(groupedUsers).sort().map(letter => (
              <div key={letter}>
                <h2 className="letter-heading">{letter}</h2>
                {groupedUsers[letter].map(user => (
                  <UserCard
                    key={user._id} // Use _id as the key
                    user={user}
                    actions={[{ className: 'remove-icon', icon: <ImCross />, onClick: () => cancelTheRequest(user._id) }]}
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

export default SentPage;
