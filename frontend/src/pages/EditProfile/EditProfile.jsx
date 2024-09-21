import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft , MdEdit} from 'react-icons/md';
import './EditProfile.css';
import LeftSideBar from '../../components/ActivityLeftSideBar/LeftSideBar';
import IdContext from '../../context/IdContext';
import { axiosPrivate } from '../../CustomApi/Axios';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfile = () => {
    const navigate = useNavigate();
    const { matrimonyProfileId } = useContext(IdContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const [profilePic, setProfilePic] = useState('assets/Images/defaultProfilePic.jpg');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedReels, setSelectedReels] = useState([]);
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

   

    const handleBack = () => navigate(-1);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await axiosPrivate.get(`/api/matrimony/profile/getProfile/${matrimonyProfileId}`);
                if (data) {
                    setProfileData(data);
                    setProfilePic(data.profilePic || 'assets/Images/defaultProfilePic.jpg');
                }
            } catch (error) {
                toast.error('Error fetching profile');
                console.error('Error fetching profile:', error);
            }
        };
        getProfile();
    }, [matrimonyProfileId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosPrivate.put(`/api/matrimony/profile/updatetheProfile/${matrimonyProfileId}`, profileData);

            const imageUrls = await Promise.all(selectedImages.map(file => uploadToCloudinary(file)));
            const reelUrls = await Promise.all(selectedReels.map(file => uploadToCloudinary(file)));

            if (imageUrls.length || reelUrls.length) {
                await axios.post('https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload', {
                    images: imageUrls,
                    reels: reelUrls
                });
            }

            toast.success('Profile updated successfully');

        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'upload'); // Replace with your Cloudinary preset

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading to Cloudinary', error);
            toast.error('Failed to upload file');
            return null;
        }
    };

    const handleFileChange = async (e) => {
        const { files, name } = e.target;
        let fileUrls = [];

        const validateFileSize = (file) => file.size <= MAX_FILE_SIZE;

        const validFiles = Array.from(files).filter(validateFileSize);
        if (files.length !== validFiles.length) {
            toast.error('Some files are too large and will not be uploaded.');
        }

        fileUrls = await Promise.all(validFiles.map(uploadToCloudinary));

        if (name === 'multipleimg') {
            if (validFiles.length + profileData.photos.length > 5) {
                toast.error('You can only upload up to 5 images');
                return;
            }
            setProfileData((prevData) => ({
                ...prevData,
                photos: [...prevData.photos, ...fileUrls]
            }));
        } else if (name === 'reel') {
            if (validFiles.length + profileData.video.length > 5) {
                toast.error('You can only upload up to 5 videos');
                return;
            }
            setProfileData((prevData) => ({
                ...prevData,
                video: [...prevData.video, ...fileUrls]
            }));
        }
    };

     // New handler for profile picture change
     const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.size <= MAX_FILE_SIZE) {
            const newProfilePicUrl = await uploadToCloudinary(file);
            if (newProfilePicUrl) {
                setProfilePic(newProfilePicUrl);
                setProfileData({ ...profileData, profilePic: newProfilePicUrl });
            }
        } else {
            toast.error('Profile picture is too large. Please choose a file smaller than 10MB.');
        }
    };

    const removeImage = (index) => {
        setProfileData({
            ...profileData,
            photos: profileData.photos.filter((_, i) => i !== index)
        });
    };

    const removeReel = (index) => {
        setProfileData({
            ...profileData,
            video: profileData.video.filter((_, i) => i !== index)
        });
    };

    const onClick = () => navigate('/change');

    return (
        <div className="activitycontainer">
            <div className={`leftsidebar ${isSidebarOpen ? 'blur' : ''}`}>
                <LeftSideBar />
            </div>
            <div className={`main ${isSidebarOpen ? 'blur' : ''}`}>
                <div className="activity-header">
                    <header className="messages-header">
                        <span className="back-arrow" onClick={handleBack}>
                            <MdOutlineKeyboardArrowLeft />
                        </span>
                        <h1 className="title">Edit My Profile</h1>
                        
                    </header>
                </div>

                <section className="edit-profile-container">
                    <div className="user-info">
                        <div className="profile-pic-container">
                            <img src={profilePic} alt="Profile" className="user-image" />
                            <label htmlFor="profile-pic-upload" className="edit-icon">
                                <MdEdit />
                            </label>
                            <input
                                type="file"
                                id="profile-pic-upload"
                                accept="image/*"
                                name="profilePic"
                                onChange={handleProfilePicChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="user-details">
                            <h2>{profileData.firstName} {profileData.lastName}</h2>
                            <p>{profileData.aboutMe || 'No bio available'}</p>
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
                            disabled
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={profileData.phoneNumber}
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                          <div className="form-group">        
                            <input
                            type="text"
                                name="bio"
                                value={profileData.aboutMe}  // Make sure this is bound to profileData.bio
                                placeholder="Bio"
                                onChange={handleChange}  // Ensure onChange is handled properly
                            ></input>
                        </div>
                        <div className="image-upload-section">
                            <div className="image-title">Images</div>
                            <div className="image-previews">
                                {profileData.photos.map((photo, index) => (
                                    <div className="image-preview-container" key={index}>
                                        <img src={photo} alt={`Upload ${index}`} className="image-preview" />
                                        <button type="button" className="close-button" onClick={() => removeImage(index)}>&times;</button>
                                    </div>
                                ))}
                                <label htmlFor="image-upload" className="upload-icon">+</label>
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    multiple
                                    name="multipleimg"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div className="reel-title">Reels</div>
                            <div className="reel-previews">
                                {profileData.video.map((video, index) => (
                                    <div className="reel-preview-container" key={index}>
                                        <video src={video} className="reel-preview" controls />
                                        <button type="button" className="close-button" onClick={() => removeReel(index)}>&times;</button>
                                    </div>
                                ))}
                                <label htmlFor="reel-upload" className="upload-icon">+</label>
                                <input
                                    type="file"
                                    id="reel-upload"
                                    accept="video/*"
                                    multiple
                                    name="reel"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <span className="firstTextNav" onClick={onClick}>Change password</span>
                        </div>

                        <button type="submit" className="submit-btn">Save</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default EditProfile;
