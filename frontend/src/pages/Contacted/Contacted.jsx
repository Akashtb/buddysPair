
import Header from '../../components/NotifyHeader/Header';
import UserCard from '../../components/NotifyUserCard/UserCard';
import './Contacted.css';
import { TiTick } from 'react-icons/ti';
import { RxCross2 } from 'react-icons/rx';
import { useContext, useEffect, useState } from 'react';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import IdContext from '../../context/IdContext';
import useAxiosPrivate from '../../CustomApi/UseAxiosPrivate';

const Contacted = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { matrimonyProfileId} = useContext(IdContext);
  const[contactedProfiles,setContactedProfiles] = useState([])


  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  useEffect(() => {
    const fetchContactedProfiles = async () => {
      try {
        const response = await axiosPrivate.get(`/api/matrimony/conversation//getContactedProfile/66cab7ef1b514a6d77517c63`);
        setContactedProfiles(response.data);
      } catch (error) {
        console.error("Error fetching sent requests or profiles:", error);
      }
    };
    fetchContactedProfiles();
  }, [axiosPrivate, matrimonyProfileId]);

  console.log("contactedProfiles",contactedProfiles);
  

    // Sort users alphabetically and group by the first letter
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
      {Object.keys(groupedUsers).sort().map(letter => (
            <div key={letter}>
              <h2 className="letter-heading">{letter}</h2>
              {groupedUsers[letter].map(user => (
          <UserCard
            key={user.id}
            user={user}
            actions={[ 
              // { className: 'accept-icon', icon: <TiTick />},
              // { className: 'remove-icon', icon:<RxCross2 />},
            ]}
          />
        ))}
        </div>
      ))}
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
