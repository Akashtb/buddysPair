import { useContext, useEffect, useState } from 'react';
import './PartnerPreference.css';
import { Range, getTrackBackground } from "react-range";
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import { CiSearch } from 'react-icons/ci';
import { axiosPrivate } from '../../CustomApi/Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import IdContext from '../../context/IdContext';

const PartnerPreference = () => {
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [heightRange, setHeightRange] = useState([100, 220]);
  const [hobbies, setHobbies] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [profileData, setProfileData] = useState({});
  const { matrimonyProfileId } = useContext(IdContext);
  const [profilePic, setProfilePic] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedEducations, setSelectedEducations] = useState([]);
  const [selectedReligions, setSelectedReligions] = useState([]);
  const [selectedOccupations, setSelectedOccupations] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const [selectedLocations, setSelectedLocations] = useState([]);
  const keralaDistricts = [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasargod',
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
    'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ];
  const interestOptions = ['music', 'singing','dance', 'riding', 'travelling', 'sports', 'fitness'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const educationOptions = ['High School', 'Bachelors', 'Masters', 'Doctorate'];
  const religionOptions = ['Christian', 'Islam', 'Hindu', 'Other'];
  const occupationOptions = ['IT', 'Accountant', 'Doctor', 'Engineer', 'Business', 'Banker', 'Other'];

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedLocations.includes(selectedOption)) {
      setSelectedLocations([...selectedLocations, selectedOption]);
    }
  };

  const handleInterestSelect = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !hobbies.includes(selectedOption)) {
      setHobbies([...hobbies, selectedOption]);
    }
  };

  const handleOccupationSelect = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedOccupations.includes(selectedOption)) {
      setSelectedOccupations([...selectedOccupations, selectedOption]);
    }
  };
  const handleEducationSelect = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedEducations.includes(selectedOption)) {
      setSelectedEducations([...selectedEducations, selectedOption]);
    }
  };
  const handleReligionSelect = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedReligions.includes(selectedOption)) {
      setSelectedReligions([...selectedReligions, selectedOption]);
    }
  };

  const removeTag = (type, tag) => {
    if (type === 'location') {
      setSelectedLocations(selectedLocations.filter((location) => location !== tag));
    } else if (type === 'hobby') {
      setHobbies(hobbies.filter((hobby) => hobby !== tag));
    } else if (type === 'occupation') {
      setSelectedOccupations(selectedOccupations.filter((occupation) => occupation !== tag));
    } else if (type === 'religion') {
      setSelectedReligions(selectedReligions.filter((religion) => religion !== tag));
    } else if (type === 'education') {
      setSelectedEducations(selectedEducations.filter((education) => education !== tag));
    }
  };

  const handleSubmit = async () => {
    const preferences = {
      gender: selectedGender,
      fromAge: ageRange[0],
      toAge: ageRange[1],
      district: selectedLocations,
      interest: hobbies,
      religion: selectedReligions,
      qualification: selectedEducations,
      profession: selectedOccupations,
      fromHeight: heightRange[0],
      toHeight: heightRange[1],
    };

    try {
      const response = await axiosPrivate.put(`/api/matrimony/profile/savePreferences/${matrimonyProfileId}`, preferences);
      if (response.status === 200) {
        toast.success("Preferences saved successfully");
        navigate('/locationSorting',{ state: { message: "Prefrence" } }); // Use navigate to programmatically navigate
      } else {
        toast.error("Failed to save preferences");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to save preferences');
      } else {
        toast.error('Error saving preferences');
      }
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`);
        if (data) {
          setProfileData(data);
          setProfilePic(data.profilePic || "assets/Images/defaultProfilePic.jpg");
          setAgeRange(data.preference ? [data.preference.fromAge, data.preference.toAge] : [18, 35]);
          setHeightRange(data.preference ? [data.preference.fromHeight, data.preference.toHeight] : [100, 220]);
          setHobbies(data.preference ? data.preference.interest || [] : []);
          setSelectedGender(data.preference?.gender || '');
          setSelectedLocations(data.preference?.district || []);
          setSelectedEducations(data.preference?.qualification || []);
          setSelectedReligions(data.preference?.religion || []);
          setSelectedOccupations(data.preference?.profession || []);
        } else {
          console.error("Profile data is empty");
        }
      } catch (error) {
        toast.error("Error fetching profile");
        console.error('Error fetching profile:', error);
      }
    };

    getProfile();
  }, [matrimonyProfileId]);

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
        <div className="preference-header">
          <span className='search'><CiSearch /></span>
          <h1 className="title">Privacy & Settings</h1>
          <div className="profilePicContainer" onClick={toggleProfileOptions}>
            <img src={profilePic || "assets/Images/defaultProfilePic.jpg"} alt="Profile" className="profilePic" />
          </div>
        </div>

        <div className="preference-section">
          <h2>Partner Preference</h2>
          <div className="preference-form">
            <FormGroup
              label="Age"
              values={ageRange}
              min={18}
              max={35}
              onChange={setAgeRange}
              text=""
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">Select </option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Locations</label>
            <select className="form-control" onChange={handleSelectChange}>
              <option value="">Select</option>
              {keralaDistricts.map(district => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <div className="tags">
              {selectedLocations.map((location) => (
                <span key={location}>
                  {location} <button onClick={() => removeTag('location', location)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Interests & Hobbies</label>
            <select className="form-control" onChange={handleInterestSelect}>
              <option value="">Select </option>
              {interestOptions.map(hobby => (
                <option key={hobby} value={hobby}>
                  {hobby}
                </option>
              ))}
            </select>
            <div className="tags">
              {hobbies.map((hobby) => (
                <span key={hobby}>
                  {hobby} <button onClick={() => removeTag('hobby', hobby)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Education</label>
            <select className="form-control"  onChange={ handleEducationSelect}>
              <option value="">Select</option> 
              {educationOptions.map((education) => (
                <option key={education} value={education}>
                  {education}
                </option>
              ))}
            </select>
            <div className="tags">
              {selectedEducations.map((education) => (
                <span key={education}>
                  {education} <button onClick={() => removeTag('education', education)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <select className="form-control" onChange={handleOccupationSelect} >
            <option value="">Select</option> 
              {occupationOptions.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
            <div className="tags">
              {selectedOccupations.map((occupation) => (
                <span key={occupation}>
                  {occupation} <button onClick={() => removeTag('occupation', occupation)}>x</button>
                </span>
              ))}
            </div>
          </div>

          <FormGroup
            label="Height"
            values={heightRange}
            min={100}
            max={220}
            onChange={setHeightRange}
            text="cm"
          />

          <div className="form-group">
            <label>Religion</label>
            <select
              className="form-control" onChange={handleReligionSelect} >
                      <option value="">Select</option> 
              {religionOptions.map((religion) => (
                <option key={religion} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
            <div className="tags">
              {selectedReligions.map((religion) => (
                <span key={religion}>
                  {religion} <button onClick={() => removeTag('religion', religion)}>x</button>
                </span>
              ))}
            </div>
          </div>

           {/* Submit Button */}
           <div className="form-group">
            <button className="submit-btn" onClick={handleSubmit}>
              Apply
            </button>
          </div>
        </div>
      </div>      {
        showProfileOptions && (
          <div className="profileOptionsContainer">
            <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
          </div>
        )
      }
    </div >
)}


const FormGroup = ({ label, text, values, min, max, onChange }) => (
  <div className="form-group">
    <div className="range-label">
      <label>{label}</label>
      <div className="range-values">
        <span>{values[0]} - {values[1]} {text}</span> {/* Showing the current range */}
      </div>
    </div>
    <div className="range-slider-container">
      <div className="range-slider">
        <Range
          step={1}
          min={min}
          max={max}
          values={values}
          onChange={onChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#548BF4", "#ccc"],
                    min,
                    max
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "24px",
                width: "24px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA"
              }}
            />
          )}
        />
      </div>
    </div>
  </div>
);

export default PartnerPreference;
