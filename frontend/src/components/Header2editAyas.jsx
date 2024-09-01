import React from 'react'
import { FaSearch } from "react-icons/fa";

const Header2edit = ({ title }) => {
  return (
    <div>
      <div className="grid grid-cols-1 h-24 bg-pink-950">
        <div className="  "><p className="absolute left-4 bg-pink-400 rounded-full w-6 h-6 justify-center p-1 m-5 text-white"> <FaSearch />
        
        </p></div>
        <div>
          <div className="place-content-center "><p className=" -mt-8 font-bold text-white place-content-center text-center text-2xl"><header>{title}</header></p></div>

        </div>

      </div>
      <div className='grid grid-cols-1 bg-white h-7 rounded-t-full -my-6'></div>
    </div>
  )
}

export default Header2edit
