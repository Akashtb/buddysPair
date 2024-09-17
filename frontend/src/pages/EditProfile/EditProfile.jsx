import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import './EditProfile.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import IdContext from '../../context/IdContext';
import { axiosPrivate } from '../../CustomApi/Axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { matrimonyProfileId } = useContext(IdContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        bio: '',
        photos: [],
        video: []
    });
    const [profilePic, setProfilePic] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedReels, setSelectedReels] = useState([]);

    const toggleProfileOptions = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setShowProfileOptions(!showProfileOptions);
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`);

                if (data) {
                    setProfileData(data);
                    setProfilePic(data.profilePic || "assets/Images/defaultProfilePic.jpg");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Handle profile updates
            await axiosPrivate.put(`/api/matrimony/profile/updatetheProfile/${matrimonyProfileId}`, profileData);
    
            // Handle file uploads
            const formData = new FormData();
            selectedImages.forEach(image => formData.append('images', image));
            selectedReels.forEach(reel => formData.append('reels', reel));
    
            // Only make this request if there are files to upload
            if (selectedImages.length || selectedReels.length) {
                await axiosPrivate.post('/api/matrimony/profile/uploadFiles', formData);
            }
    
            alert('Profile updated successfully');
            navigate('/buddysHomePage'); // Navigate to a profile page or other desired location
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
    
        if (type === 'images') {
            if (profileData.photos.length + files.length > 5) {
                toast.error("You can only upload a maximum of 5 images.");
                return;
            }
            setSelectedImages([...selectedImages, ...files]);
            setProfileData({
                ...profileData,
                photos: [...profileData.photos, ...files.map(file => URL.createObjectURL(file))]
            });
        } else if (type === 'reels') {
            if (profileData.video.length + files.length > 5) {
                toast.error("You can only upload a maximum of 5 reels.");
                return;
            }
            setSelectedReels([...selectedReels, ...files]);
            setProfileData({
                ...profileData,
                video: [...profileData.video, ...files.map(file => URL.createObjectURL(file))]
            });
        }
    };
    
    const removeImage = (index) => {
        setProfileData({
            ...profileData,
            photos: profileData.photos.filter((_, i) => i !== index)
        });
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const removeReel = (index) => {
        setProfileData({
            ...profileData,
            video: profileData.video.filter((_, i) => i !== index)
        });
        setSelectedReels(selectedReels.filter((_, i) => i !== index));
    };

    const onClick = () => {
        navigate('/change')
    };

    return (
        <div className="activitycontainer">
            <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
                <LeftSideBar/>
            </div>
            <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
                <div className="activity-header">
                    <header className="messages-header">
                        <span className="back-arrow" onClick={handleBack}><MdOutlineKeyboardArrowLeft /></span>
                        <h1 className="title">Edit My Profile</h1>
                        <div className="profilePicContainer" onClick={toggleProfileOptions}>
                            <img src={profilePic || "assets/Images/defaultProfilePic.jpg"} alt="Profile" className="profilePic" />
                        </div>
                    </header>
                </div>

                <section className="edit-profile-container">
                    <div className="user-info">
                        <img src={profilePic || "assets/Images/defaultProfilePic.jpg"} alt="Profile" className="user-image" />
                        <div className="user-details">
                            <h2>{profileData.firstName} {profileData.lastName}</h2>
                            <p>{profileData.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <p className="info-text">All your account information can be accessed and edited here but your mail will still remain un-edited.</p>
                    <form className="edit-profile-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            placeholder="First Name"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            placeholder="Last Name"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="userName"
                            value={profileData.userName}
                            placeholder="Username"
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={profileData.phoneNumber}
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                        <textarea
                            name="bio"
                            value={profileData.bio}
                            placeholder="Bio"
                            onChange={handleChange}
                        ></textarea>

                        <div className="image-upload-section">
                            <div className="image-title">Images</div>
                            <div className="image-previews">
                                {profileData.photos && profileData.photos.map((photo, index) => (
                                    <div className="image-preview-container" key={index}>
                                        <img src={photo} alt={`Upload ${index}`} className="image-preview" />
                                        <button 
                                            type="button" 
                                            className="close-button" 
                                            onClick={() => removeImage(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                <label htmlFor="image-upload" className="upload-icon">+</label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    multiple
                                    onChange={(e) => handleFileChange(e, 'images')}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className="reel-title">Reels</div>
                            <div className="reel-previews">
                                {profileData.video && profileData.video.map((video, index) => (
                                    <div className="reel-preview-container" key={index}>
                                        <video src={video} alt={`Reel ${index}`} className="reel-preview" controls />
                                        <button 
                                            type="button" 
                                            className="close-button" 
                                            onClick={() => removeReel(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                <label htmlFor="reel-upload" className="upload-icon">+</label>
                                <input
                                    type="file"
                                    id="reel-upload"
                                    multiple
                                    accept="video/*"
                                    onChange={(e) => handleFileChange(e, 'reels')}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <span className="firstTextNav" onClick={onClick}>Change password</span>
                        </div>

                        <button type="submit" className="update-button">Update</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default EditProfile;
