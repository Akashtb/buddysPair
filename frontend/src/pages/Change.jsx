import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/HeaderAyas';
import useAxiosPrivate from '../CustomApi/UseAxiosPrivate';
import IdContext from '../context/IdContext';

const Change = ({ Se }) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const axiosPrivate = useAxiosPrivate()
    const { userId} = useContext(IdContext);

    console.log("matrimonyProfileId in change password",userId);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmPassword } = formData;
        try {
            await axiosPrivate.post(`/api/auth/updatePassword/${userId}`,{
                 oldPassword,
                 newPassword,
                 confirmPassword
             })
             setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
             })
             toast.success('Password changed successfully');
            
         } catch (error) {
             console.error('Password updation:', error);
             if (error.response && error.response.data && error.response.data.message) {
                 if (error.response.data.message === "Old password is incorrect") {
                   toast.error("Old password is incorrect");
                 } else {
                   toast.error(error.response.data.message);
                 }
               } else {
                 toast.error("Failed to update the Password");
               }
         }

        console.log('Form Data Submitted:', formData);
    };

   

    return (
        <div className="min-h-screen flex flex-col">
            <Header title={Se} />
            <div className="py-4">
                <p className="font-light text-gray-700">
                    Feeling worried about your account being easily preyed on? Then change that password now!
                </p>
            </div>

            <div className="container mx-auto px-4 lg:px-8 flex-grow">
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="text-lg font-semibold mb-2 text-gray-700">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    className="border-b-2 border-purple-900 w-full py-2 pr-10"
                                    type="password"
                                    name="oldPassword"
                                    value={formData.oldPassword}
                                    onChange={handleChange}
                                />
                                <img
                                    src="/assets/Images/blackeye.webp"  // Replace with your image path
                                    alt="Icon"
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 h-6 w-6"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="newpass" className="text-lg font-semibold mb-2 text-gray-700">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="newpass"
                                    className="border-b-2 border-purple-900 w-full py-2 pr-10"
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <img
                                    src="/assets/Images/blackeye.webp"  // Replace with your image path
                                    alt="Icon"
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 h-6 w-6"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-6">
                            <label htmlFor="confirm" className="text-lg font-semibold mb-2 text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirm"
                                    className="border-b-2 border-purple-900 w-full py-2 pr-10"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <img
                                    src="/assets/Images/blackeye.webp"  // Replace with your image path
                                    alt="Icon"
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 h-6 w-6"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-custom-purple text-white rounded-full hover:bg-purple-800 transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Change;
