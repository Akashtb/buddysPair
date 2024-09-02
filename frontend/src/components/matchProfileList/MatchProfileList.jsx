import React from 'react'
import './matchProfileList.css'
import img1 from '../../assets/buddysHome/img8.jpg'
import { useNavigate } from 'react-router-dom';
const MatchProfileList = ({ profile }) => {
    console.log("profileDataList", profile);
    const navigate = useNavigate()

    return (
        <>
            <div className="MatchProfileListSubContainer">
                <div className='MatchProfileListImageConatiner'>
                    <img src={profile?.profilePic} alt="" className="MatchProfileListImage" onClick={() => navigate(`/other/${profile._id}`)} />
                    {/* <div className="MatchPercentage"><label>100% Match</label></div> */}
                    <div className="matchProfileNameAgePlaceContainer">
                        <div className="MatchProfileAgeNameOnlineTagContainer">
                            <div className='MatchProfileAgeNameOnlineTag'>
                                <div className='MatchProfileName'>{profile?.firstName},</div>
                                <div className='MatchProfileAge'> {profile?.age}</div>
                                {profile.isOnline && (
                                    <div className='MatchProfileAgeOnlineTag'></div>
                                )}
                            </div>
                            <div className='MatchProfilePlace'>
                                <span>{profile?.district}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MatchProfileList