import React from 'react'
import Header from '../components/Header';

const gridData = [
    { id: 1, name: 'Current Password' },
    { id: 2, name: 'New Password' },
    { id: 3, name: 'Confirm Password' },



    // Add more items as needed
];
const Change = ({ Se }) => {
    return (
        <div>
            <Header title={Se}/>
           
            <div >
                <p className='mt-6'>Feeling worried about your account been easily preyed on? Then change that password now!</p>
            </div>
            <div className='grid grid-cols-1 mt-36'>
                {gridData.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1  rounded-full my-1"
                    >
                        <h2 className="text-lg font-light mt-5 m-10 h-5">{item.name}</h2>
                        <div className='grid bg-black h-1 text-white mx-20'></div>
                    </div>
                ))}
            </div>
            <div className=' grid bg-pink-900 h-32 place-content-center rounded-full mt-28 font-bold mb-11'>
                <h1 className='text-white'>UPDATE</h1>
            </div>
        </div>
    )
}

export default Change
