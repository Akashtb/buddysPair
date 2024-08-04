import React from 'react'

const Header = ({title}) => {
  return (
    <div>
       <div className='grid grid-cols-3 bg-blue-900 h-36 rounded-t-3xl'>
       <div><i className="fa-solid fa-magnifying-glass bg-pink-300 h-8 w-8 p-2 rounded-full justify-items-start place-content-center m-16"  ></i></div>
                <div className='font-bold  col-span-2 self-start'><p className='mt-8 p-5  text-3xl text-white'><header>{title}</header></p></div>
            </div>
            <div className='grid grid-cols-2 bg-blue-900 '>
                <div className='grid grid-rows-1 bg-white rounded-tl-3xl text-white'>
                    .
                </div>
                <div className='grid grid-rows-12 bg-white rounded-tr-3xl'>

                </div>
            </div>
    </div>
  )
}

export default Header
