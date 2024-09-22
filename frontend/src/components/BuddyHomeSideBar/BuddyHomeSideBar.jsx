import React from 'react'
import './BuddyHomeSideBar.css'
import { AiFillHome } from 'react-icons/ai'
import { FaHeart, FaRegStar } from 'react-icons/fa6'
import { IoChatbubbleSharp } from 'react-icons/io5'
import { BsSearchHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
const BuddyHomeSideBar = () => {
  const navigate = useNavigate()
  const RedirectedHomePage = (path)=>{
      navigate(path)
  }
  return (
    <div className='BuddyHomeSideBarContainer'>
      <div className="BuddyHomeSideBarSubContainer">
        <div className="BuddyHomeSideBarSubContainerIconAndDesc" onClick={()=>onClick=RedirectedHomePage('/buddysHomePage')}>
          <span className='BuddyHomeSideBarSubContainerIcon'><AiFillHome /></span>
          <label className='BuddyHomeSideBarSubContainerDesc'>Home</label>
        </div>
        <div className="BuddyHomeSideBarSubContainerIconAndDesc" onClick={()=>onClick=RedirectedHomePage('/sent')}>
          <span className='BuddyHomeSideBarSubContainerIcon'><FaHeart /></span>
          <label className='BuddyHomeSideBarSubContainerDesc'>Love</label>
        </div>
        <div className="BuddyHomeSideBarSubContainerIconAndDesc" onClick={()=>onClick=RedirectedHomePage('/messsage')}>
          <span className='BuddyHomeSideBarSubContainerIcon'><IoChatbubbleSharp/></span>
          <label className='BuddyHomeSideBarSubContainerDesc'>Message</label>
        </div>
        <div className="BuddyHomeSideBarSubContainerIconAndDesc" onClick={()=>onClick=RedirectedHomePage('/shortlist')}>
          <span className='BuddyHomeSideBarSubContainerIcon'><FaStar /></span>
          <label className='BuddyHomeSideBarSubContainerDesc'>Favourites</label>
        </div>
        <div className="BuddyHomeSideBarSubContainerIconAndDesc"  onClick={()=>onClick=RedirectedHomePage('/filter')}>
          <span className='BuddyHomeSideBarSubContainerIcon'><BsSearchHeartFill/></span>
          <label className='BuddyHomeSideBarSubContainerDesc'>Search</label>
        </div>
        
      </div>
    </div>
  )
}

export default BuddyHomeSideBar