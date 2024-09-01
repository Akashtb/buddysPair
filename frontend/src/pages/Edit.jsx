
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import React from 'react'
import Header from '../components/HeaderAyas';
const Edit = ({ Se }) => {
  // Initialize state for form fields
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: "",
    bio: '',
    images: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedReels, setSelectedReels] = useState([]);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [currentImage, setCurrentImage] = useState('/assets/Images/mohanlal.jpeg'); // Default image
  const PhotoInputRef = useRef(null); // Reference to the file input

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleStaticImageClick = () => {
    PhotoInputRef.current.click(); // Programmatically trigger the file input
  };
  const handleRemoveImage = (index) => {
    setSelectedReels((prevReels) =>
      prevReels.filter((_, i) => i !== index)
    );
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const imageUrls = files.map(file => URL.createObjectURL(file)); // Create URLs for the selected files
    setSelectedImage(prevImages => [
      ...prevImages,
      ...imageUrls,
    ]); // Update state with new image URLs
  };

  const handleFileChange2 = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const imageUrls = files.map(file => URL.createObjectURL(file)); // Create URLs for the selected files
    setSelectedReels(prevImages => [
      ...prevImages,
      ...imageUrls,
    ]); // Update state with new image URLs
  };
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Click the file input element
  };

  const handleButtonClick2 = () => {
    fileInputRef2.current.click(); // Click the file input element
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const { name, username, email, phone, bio } = formData;
    if (!name || !username || !email || !phone || !bio) {
      alert('Please fill out all fields.');
      return; // Stop form submission if validation fails
    } else {
      alert('Your code is submitted')
      setFormSubmitted(true);
      setSelectedImage([]);

    }

    // Proceed with form submission if all fields are filled
    console.log('Form Data Submitted:', formData);
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      bio: '',
      images: '',
      reels: '',
    });
  };
  // React.useEffect(() => {
  return (
    <div>
      <Header title={Se} />
      <div className="grid grid-cols-1 h-24">
        <div className="relative">
          {/* Changing image */}
          <img
            src={currentImage}
            alt="Current"
            className="w-24 h-24 object-cover border-2 border-gray-300  rounded-full md:ml-32"
          />

          {/* Static image on top */}
          <img
            src="/assets/Images/pencil.jpg" // Path to the static image
            alt="Static"
            className="absolute top-16 left-8 w-8 h-8 object-cover rounded-full border z-10 cursor-pointer md:ml-32"
            onClick={handleStaticImageClick}
          />
        </div>

        {/* File input for uploading images */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          // id="fileInput"
          ref={PhotoInputRef}
          onChange={handlePhotoChange}
        />

        <div>
          <div className=" "><p className="absolute left-24 -mt-10 font-bold md:ml-40">Mohanlal</p></div>
          <div className=" "><p className="absolute left-24 text-sm -mt-4 md:ml-40">Never give up</p></div>

        </div>

      </div>

      <div className='container -mx-8 lg:w-full'>
        <div className='flex justify-center'>

          <form onSubmit={handleSubmit} className='grid grid-cols-1 mt-4 md:grid-cols-2 '>
            <div className='mt-8'>
              <label className=''>
                Name
              </label>

            </div>
            <div>
              <input className='  border-b-purple-900 border-b-2 w-full md:mt-7'
                type="text"
                name="name"

                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className='mt-8'>
              <label className='py-4'>
                Username
              </label>

            </div>
            <div>
              <input className='  border-b-purple-900 border-b-2 w-full md:mt-7'
                type="text"
                name="username"

                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className='mt-8'>
              <label className=''>
                Email
              </label>

            </div>
            <div>
              <input className='  border-b-purple-900 border-b-2 w-full md:mt-7'
                type="text"
                name="email"

                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='mt-8'>
              <label className=''>
                Phone Number
              </label>

            </div>
            <div>
              <input className='  border-b-purple-900 border-b-2 w-full md:mt-7'
                type="text"
                name="phone"

                value={formData.phone}
                onChange={handleChange}
              />
            </div>


            <div className='mt-8'>
              <label className=''>
                Bio
              </label>

            </div>
            <div>
              <input className='  border-b-purple-900 border-b-2 w-full md:mt-7'
                type="text"
                name="bio"

                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className='mt-8'>
              <label className=''>
                Images
              </label>

            </div>
            <div className=''>
              {/* File input element */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange}
              />

              {/* Button to trigger file input */}


              {/* Display the selected image */}

              <div className='grid grid-cols-6'>
                {selectedImage.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Selected ${index}`}
                    className='h-6 md:mt-8'
                  // style={{ marginRight: '10px', maxWidth: '200px', maxHeight: '200px' }}
                  />
                ))}
                <button type="button" onClick={handleButtonClick}>
                  <img src="/assets/Images/plus-solid.svg" alt="" className='h-5 md:mt-9' />
                </button>
              </div>



            </div>
            <div className='mt-8'>
              <label className=''>
                Reels
              </label>

            </div>
            <div className=''>
              {/* File input element */}
              <input
                type="file"
                ref={fileInputRef2}
                style={{ display: 'none' }} // Hide the file input
                onChange={handleFileChange2}
              />

              {/* Button to trigger file input */}


              {/* Display the selected image */}

              <div className='grid grid-cols-6'>
                {selectedReels.map((reels, index) => (
                  <img
                    key={index}
                    src={reels}
                    alt={`Selected ${index}`}
                    className='h-6 mt-8'
                    style={{ marginRight: '10px', maxWidth: '200px', maxHeight: '200px' }}
                  />

                ))}

                {/* <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className='absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full'
                >
                  ×
                </button> */}
                <button type="button" onClick={handleButtonClick2}>
                  <img src="/assets/Images/plus-solid.svg" alt="" className='h-5 md:mt-9' />
                </button>
              </div>



            </div>

            <Link to="/change" className="text-purple-700 hover:underline mt-5">
              Change Password
            </Link>


            {/* <div className='grid grid-rows-3 mt-8 mx-7 bg-pink-900 h-16 my-5 rounded-full justify-center '>
              <div className=''>
                <button type="submit" className='mx-16 text-white mt-8 -my-10 '>Update</button>

              </div>

            </div> */}
              <div className='grid grid-cols-1  w-full'>
                <button type="submit" className='text-black bg-pink-500 py-2 px-4 rounded-full mt-10 md:-ml-14'>
                  Update
                </button>
              <div></div>
            </div>


          </form>

        </div>

      </div>
    </div>
  )
}
//     )
// }
export default Edit





