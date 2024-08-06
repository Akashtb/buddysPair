import { useState, useRef } from 'react';
import React from 'react'
import Header from '../components/Header';

const Edit = ({Se}) => {
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
        });
    };
    // React.useEffect(() => {
    return (
        <div>
            <Header title={Se}/>
            <div className='grid grid-cols-1 h-16 ' >
                <div className='grid grid-cols-9 '>
                    <div className='grid grid-rows-3  '>
                        <div className='row-start-1 row-end-9 '></div>
                        {/* <div className='col-start-1 col-end-2'></div> */}
                        <div className='grid font-bold  mx-40 text-2xl'><p>Mohanlal</p><br />
                        
                        </div>
                        
                        <img src='/mohanlal.jpeg' className='h-16 rounded-full ml-16  '></img>
                        <p className='ml-16'>All your account information can be accessed and edited here but your mail will remain un-edited</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='grid grid-cols-1 mt-36'>
                <div mt-36>
                    <label className='mx-36'>
                        Name
                    </label>
                   
                </div>
                <div>
                    <input className=' mx-36 w-60 border-solid border-2'
                        type="text"
                        name="name"
                        
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='mx-36'>
                        Username
                    </label>
                </div>
                <div>
                    <input className=' mx-36 border-solid border-2 w-60'
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='mx-36'>
                        Email
                    </label>
                </div>
                <div>
                    <input className=' mx-36 border-solid border-2 w-60'
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='mx-36'>
                        Phone
                    </label>
                </div>
                <div>
                    <input className=' mx-36 border-solid border-2 w-60'
                        type="text"
                        name="phone"
                        value={formData.phone}
                    KS    onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='mx-36'>
                        Bio
                    </label>
                </div>
                <div>
                    <input className='mx-36 border-solid border-2 w-60'
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='mx-36'>
                        Images:
                    </label>
                </div>
                <div className='grid grid cols-6'>
                    {/* File input element */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Hide the file input
                        onChange={handleFileChange}
                    />

                    {/* Button to trigger file input */}


                    {/* Display the selected image */}

                    <div className='grid grid-cols-6 mx-36 rounded-full'>
                        {selectedImage.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Selected ${index}`}
                                className='h-6'
                            // style={{ marginRight: '10px', maxWidth: '200px', maxHeight: '200px' }}
                            />
                        ))}
                        <button type="button" onClick={handleButtonClick}>
                            <img src="/plus-solid.svg" alt="" className='h-5 ' />
                        </button>
                    </div>



                </div>

                <div>
                    <label className='mx-36'>
                        Reels:
                    </label>
                </div>
                <div className=''>
                    {/* File input element */}
                    <input
                        className='h-8'
                        type="file"
                        ref={fileInputRef2}
                        style={{ display: 'none' }} // Hide the file input
                        onChange={handleFileChange2}
                    />

                    {/* Button to trigger file input */}


                    {/* Display the selected reel */}
                    <div className='grid grid-cols-6  mx-36'>
                        {selectedReels.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Selected ${index}`}
                                className='h-6'
                            // style={{ marginRight: '10px', maxWidth: '200px', maxHeight: '200px' }}
                            />
                        ))}
                        <button type="button" onClick={handleButtonClick2}>
                            <img src="/plus-solid.svg" alt="" className='h-5 ' />
                        </button>
                    </div>
                </div>

                <div className='grid place-content-center bg-pink-500 text-white h-24 rounded-full mb-4'>
                        <button type="submit">Submit</button> 
                        </div>
            </form>

            ;
                       
        </div>
    )
}
//     )
// }
export default Edit

