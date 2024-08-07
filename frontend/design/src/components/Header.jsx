import React from 'react'

const Header = ({title}) => {
  return (
    <div>
       <div className='grid grid-cols-3 bg-purple-900 h-36 rounded-t-3xl w-full'>
       <div><img src='/assets/newglass.jpeg ' className=" h-12 w-12 p-2 rounded-full justify-items-start place-content-center m-14"alt=''></img></div>
                <div className='font-bold  col-span-2 self-start'><p className='mt-8 p-5  text-3xl text-white'><header>{title}</header></p></div>
            </div>
            <div className='grid grid-cols-2 bg-purple-900 '>
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
