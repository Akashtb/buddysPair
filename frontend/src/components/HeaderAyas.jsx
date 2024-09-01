import React from 'react'
import { SlArrowLeft } from "react-icons/sl";

const Header = ({ title }) => {
  return (
    <div>
      <div className="grid grid-cols-1 h-24 bg-pink-900">
        {/* <div className="  "><p className="absolute left-4"><img src="/assets/Images/whitearrow.png" alt="" className="h-8 w-8 rounded-full mt-4 bg-pink-400" ></img></p></div> */}
        <div className="  "><p className="absolute left-5 bg-pink-500 p-1 ml-5 mt-6 h-6 w-6 rounded-full text-white">       <SlArrowLeft />
</p></div>

        <div>
          <div className="place-content-center "><p className=" -mt-8 font-bold text-white place-content-center text-center text-2xl"><header>{title}</header></p></div>

        </div>

      </div>
      <div className='grid grid-cols-1 bg-white h-7 rounded-t-full -my-6'></div>
    </div>
  )
}

export default Header
