// import { useState } from 'react';
// import React from 'react'
// import Header from '../components/Header';
// import Header2edit from '../components/Header2edit';



// const Change = ({Se}) => {
//     // Initialize state for form fields
//     const [formData, setFormData] = useState({
//         name: '',
//         password: '',
//         newPassword: '',
//     });

//     // Handle input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Check if any field is empty
//         const { name, password, newPassword } = formData;
//         if (!name || !password || !newPassword) {
//             alert('Please fill out all fields.');
//             return; // Stop form submission if validation fails
//         } else {
//             alert('Your code is submitted')
//         }

//         // Proceed with form submission if all fields are filled
//         console.log('Form Data Submitted:', formData);
//         setFormData({
//             name: '',
//             password: '',
//             newPassword: '',
//         });
//     };
//     return (
//         <div>
//             <Header2edit title={Se} />
//             <div>
//                 <p className='mx-10'>Feeling worried about your account been easily pryed on? <br />Then change that password now</p>
//             </div>
//             <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
//                 <div className='mt-6'>
//                     <label className='mx-36 mt-6'>
//                         Current Password
//                     </label>
//                 </div>
//                 <div>
//                     <input className='border-2 mx-36'
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className='mt-6'>
//                     <label className='mx-36 mt-8 '>
//                         New Password
//                     </label>
//                 </div>
//                 <div >
//                     <input className=' mx-36 border-2 w-90'
//                         type="text"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className='mt-6'>
//                     <label className='mx-36'>
//                         Confirm Password
//                     </label>
//                 </div>
//                 <div>
//                     <input className='border-2 mx-36'
//                         type="text"
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className='grid place-content-center bg-pink-500 text-white h-24 rounded-full mb-4 mt-8 mx-12'>
//                     <button type="submit">Submit</button>
//                 </div>
//             </form>

//             ;

//         </div>
//     )
// }
// export default Change

import { useState } from 'react';
import React from 'react';
import Header2edit from '../components/Header2edit';

const Change = ({ Se }) => {
    // Initialize state for form fields
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        newPassword: '',
    });

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
        const { name, password, newPassword } = formData;
        if (!name || !password || !newPassword) {
            alert('Please fill out all fields.');
            return; // Stop form submission if validation fails
        } else {
            alert('Your code is submitted');
        }

        // Proceed with form submission if all fields are filled
        console.log('Form Data Submitted:', formData);
        setFormData({
            name: '',
            password: '',
            newPassword: '',
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Header2edit title={Se} />
            <div className="px-4 py-6 max-w-lg mx-auto">
                <p className="text-center text-gray-700 mb-6">
                    Feeling worried about your account being easily pried on? <br />
                    Then change that password now.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Current Password</label>
                        <input
                            className="w-full border-2 border-gray-300 p-2 rounded"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <input
                            className="w-full border-2 border-gray-300 p-2 rounded"
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            className="w-full border-2 border-gray-300 p-2 rounded"
                            type="text"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-pink-500 text-white py-2 px-4 rounded-full shadow hover:bg-pink-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Change;


