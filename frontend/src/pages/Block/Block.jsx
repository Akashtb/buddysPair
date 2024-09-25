import { useContext, useEffect, useState } from 'react';
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './Block.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import { RxCross2 } from 'react-icons/rx';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';
import IdContext from '../../context/IdContext';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'; // Import the spinner
import { toast } from 'react-toastify';

const Block = () => {
  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId } = useContext(IdContext);
  const [blockUser, setBlockUser] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchblockRequests = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosPrivate.get(`/api/matrimony/profile/listOfBlocked/${matrimonyProfileId}`);
        setBlockUser(response.data.blockedUsers);
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchblockRequests();
  }, [axiosPrivate, matrimonyProfileId]);

  const unblockTheRequest = async UId => {
    try {
      const response = await axiosPrivate.post(`/api/matrimony/profile/unblock/${matrimonyProfileId}`, {
        otherUserId: UId
      });
      if (response.status === 200) {
        setBlockUser(prevProfiles => prevProfiles.filter(profile => profile._id !== UId));
        toast.success("successfully unblock the user")
      }
    } catch (error) {
      console.error('Error unblocking the user:', error);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const groupedUsers = blockUser.reduce((acc, user) => {
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
            title="Block"
            profilePic="assets/Images/propic1.jpg"
            onProfilePicClick={toggleProfileOptions}
          />
        </div>
        <div className="user-list">
          {loading ? (
            <LoadingSpinner /> // Show spinner while loading
          ) : blockUser.length === 0 ? (
            <div className="no-data-message">
              <p>No blocked users found.</p>
            </div>
          ) : (
            Object.keys(groupedUsers).sort().map(letter => (
              <div key={letter}>
                <h2 className="letter-heading">{letter}</h2>
                {groupedUsers[letter].map(user => (
                  <UserCard key={user._id} user={user} actions={[
                    {
                      className: 'remove-icon',
                      icon: <RxCross2 />,
                      onClick: () => unblockTheRequest(user._id)
                    },
                  ]} />
                ))}
              </div>
            ))
          )}
        </div>

        {showProfileOptions && (
          <div className="profileOptionsContainer">
            <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Block;
