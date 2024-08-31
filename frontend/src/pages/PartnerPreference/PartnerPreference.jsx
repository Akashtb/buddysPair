import { useState } from 'react';
import './PartnerPreference.css';
import { Range, getTrackBackground } from "react-range";
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import BuddyHomeProfile from '../../components/BuddysHomeProfile/BuddyHomeProfile';
import { CiSearch } from 'react-icons/ci';

const PartnerPreference = () => {
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [heightRange, setHeightRange] = useState([100, 220]);
  const [weightRange, setWeightRange] = useState([40, 150]);
  const [locations, setLocations] = useState(['Kochi', 'Kollam', 'Aluva']);
  const [hobbies, setHobbies] = useState(['yoga', 'jazz', 'cooking']);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [hobbyInput, setHobbyInput] = useState('');

  const toggleProfileOptions = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowProfileOptions(!showProfileOptions);
  };

  const removeTag = (type, tag) => {
    if (type === 'location') {
      setLocations(locations.filter((location) => location !== tag));
    } else if (type === 'hobby') {
      setHobbies(hobbies.filter((hobby) => hobby !== tag));
    }
  };

  const addHobby = (e) => {
    if (e.key === 'Enter' && hobbyInput.trim()) {
      setHobbies([...hobbies, hobbyInput.trim()]);
      setHobbyInput('');
    }
  };

  const handleSubmit = () => {
    // Handle form submission or data processing here
    console.log('Form Submitted');
  };

  const [selectedLocations, setSelectedLocations] = useState([]);
  const keralaDistricts = [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasargod',
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad',
    'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ];

  const genderOptions = ['Male', 'Female', 'Other'];
  const educationOptions = ['High School', 'Bachelors', 'Masters', 'Doctorate'];
  const religionOptions = ['Christianity', 'Islam', 'Hinduism', 'Other'];
  const occupationOptions = ['Student', 'Employed', 'Self-Employed', 'Unemployed'];

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !selectedLocations.includes(selectedOption)) {
      setSelectedLocations([...selectedLocations, selectedOption]);
    }
  };

  return (
    <div className="activitycontainer">
      <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
        <LeftSideBar />
      </div>
      <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
      <div className="preference-header">
      <span className='search'><CiSearch /></span>
        <h2>Privacy & Settings</h2>
        <div className="profilePicContainer" onClick={toggleProfileOptions}>
          <img src="assets/Images/propic1.jpg" alt="" className="profilePic" />
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
            <select className="form-control">
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
            <input
              type="text"
              className="form-control"
              value={hobbyInput}
              onChange={(e) => setHobbyInput(e.target.value)}
              onKeyDown={addHobby}
              placeholder="Type a hobby "
            />
            <div className="tags">
              {hobbies.map((hobby) => (
                <span key={hobby}>
                  {hobby} <button onClick={() => removeTag('hobby', hobby)}>x</button>
                </span>
              ))}
            </div>
          </div>
 
        <div className="form-group">
          <label>Education Level</label>
          <select className="form-control">
            {educationOptions.map((education) => (
              <option key={education} value={education}>
                {education}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <RangeGroup
            label="Height"
            values={heightRange}
            text="cm"
            min={100}
            max={220}
            onChange={setHeightRange}
          />
          <RangeGroup
            label="Weight"
            values={weightRange}
            text="kg"
            min={40}
            max={150}
            onChange={setWeightRange}
          />
        </div>
        <div className="form-group">
          <label>Religion</label>
          <select className="form-control">
            {religionOptions.map((religion) => (
              <option key={religion} value={religion}>
                {religion}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Occupation</label>
          <select className="form-control">
            {occupationOptions.map((occupation) => (
              <option key={occupation} value={occupation}>
                {occupation}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button className="submit-btn" onClick={handleSubmit}>
         Apply
          </button>
        </div>
      </div>
    </div>

      {
    showProfileOptions && (
      <div className="profileOptionsContainer">
        <BuddyHomeProfile toggleProfileOptions={toggleProfileOptions} />
      </div>
    )
  }
    </div >
  );
};

const FormGroup = ({ label, text, values, min, max, onChange }) => (
  <div className="form-group">
    <div className="range-label">
      <label>{label}</label>
      <div className="range-values">
        <span>{values[0]} - {values[1]}</span>
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
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: getTrackBackground({
                  values,
                  colors: ["#4a90e2", "#ccc", "#4a90e2"],
                  min,
                  max
                }),
                borderRadius: "3px"
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #aaa"
              }}
            />
          )}
        />
      </div>
    </div>
  </div>
);

const RangeGroup = ({ label, text, values, min, max, onChange }) => (
  <div className="form-group">
    <div className="range-label">
      <label>{label}</label>
      <div className="range-values">
        <span>{values[0]} - {values[1]} {text}</span>
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
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: getTrackBackground({
                  values,
                  colors: ["#4a90e2", "#ccc", "#4a90e2"],
                  min,
                  max
                }),
                borderRadius: "3px"
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #aaa"
              }}
            />
          )}
        />
      </div>
    </div>
  </div>
);

export default PartnerPreference;
