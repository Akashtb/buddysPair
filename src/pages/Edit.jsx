import React from 'react'
import Header from '../components/Header';

const gridData = [
    { id: 1, name: 'Name' },
    { id: 2, name: 'Username' },
    { id: 3, name: 'Email' },
    { id: 4, name: 'Phone Number' },
    { id: 5, name: 'Bio' },


    // Add more items as needed
];

const Edit = ({Se}) => {
    return (
        <div>
            <Header title={Se}/>
            <div className='grid grid-cols-2'>
                <div className=' mx-5  '> <img src='/mohanlal.jpeg' alt='' className='rounded-full h-20 mx-14'></img>
                <div className='mx-40 '>Mohanlal</div></div>
                
            </div>
            <div className='grid mx-28 mt-5 '>All your account information</div>
            <div className=" grid grid-cols-1  gap-3 mt-5 h-px mx-3">
                {gridData.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-1  rounded-full my-1"
                    >
                        <h2 className="text-lg font-light mt-5 m-10 h-5">{item.name}</h2>
                        <div className='grid bg-black h-1 text-white mx-20'>gn</div>
                    </div>
                ))}
                <div className='grid grid-cols-1 text-lg font-light mt-5 m-10 h-5'>
                    Images
                </div>
                <div className='grid grid-cols-4'>
                    <div className='mx-20 -my-7'><img src='/mammootty.jpeg' alt='' className='rounded-full h-8' ></img></div>
                    <div className='mx-14 -my-7'><img src='/mammootty.jpeg' alt='' className='rounded-full h-8' ></img></div>
                    <div className='-mx-1 -my-7'><img src='/mammootty.jpeg' alt='' className='rounded-full h-8' ></img></div>
                    <div><img src='/plus-solid.svg' alt='' className='h-8 -my-7 -mx-7'></img></div>
                </div>
                <div className='grid grid-cols-1 text-lg font-light mt-5 m-10 h-5'>
                    Reels
                </div>
                <div className='grid grid-cols-4 my-2'>
                    <div className='mx-20 -my-4'><img src='/mammootty.jpeg' alt='' className='rounded-full h-8' ></img></div>
                    <div className='mx-14 -my-4'><img src='/mammootty.jpeg' alt='' className='rounded-full h-8' ></img></div>
                    <div><img src='/plus-solid.svg' alt='' className='h-8 -my-4'></img></div>
                    <div></div>
                </div>
                <div className=' grid bg-pink-900 h-32 place-content-center rounded-full mt-5 font-bold mb-11'>
                    <h1 className='text-white'>UPDATE</h1>
                </div>

            </div>

        </div>
    )
}

export default Edit
