import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='grid grid-cols-6 h-14 bg-yellow-700 rounded-full mx-10 -my-28 content-evenly mt-10'>
    <div></div>
      <div><img src='/house.png' alt=''className='bg-pink-500 h-6 rounded-full m-2 '></img></div>
      <div><img src='/location-arrow-solid.svg' alt='' className='h-6 m-2 bg-white rounded-full'></img></div>
      <div><img src='/color-management.svg' alt='' className='h-9'></img></div>
      <div><img src='/icons8-multiple-users-32.png' alt='d'></img> </div>
      <div ><i class="fa-regular fa-comment"></i></div>

   </div>
    </div>
  )
}

export default Footer
