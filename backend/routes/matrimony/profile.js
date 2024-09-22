import express from 'express'
import { acceptRequest, addViewedProfile, blockUser, cancelSentRequest, cancelShortListTheProfile, createProfile, filterUpdate, findConnectionStatus, getFilteredProfiles, getProfileByUserID, listBlockedUsers, listOfAccepted, listOfRejection, listOfSentRequest, listOfUserViwedMyProfile, nearbyProfile, professionProfile, qualificationProfile, rejectTheRequest, requestListOfUser, reRegisterProfile, searchProfiles, sendRequest, shortListedList, shortListedListedBy, shortListedListOfAUser, shortListTheProfile, sortedProfile, unblockUser, unfriend, updateProfile, updateProfilePreference, viewAUser } from '../../controllers/matrimonyProfile.js'
import { verifyProfile, verifyRegisterToken, verifyUser } from '../../utils/verifyToken.js';
const router = express.Router()

router.post('/createProfile',verifyRegisterToken,createProfile)
router.get('/searchProfiles', searchProfiles);
router.get('/getProfile/:id',viewAUser);
router.put('/updatetheProfile/:id',verifyProfile,updateProfile)
router.post('/sendRequest/:id',verifyProfile,sendRequest)
router.post('/acceptRequest/:id',verifyProfile,acceptRequest) 
router.post('/rejectTheRequest/:id',verifyProfile,rejectTheRequest) 
router.post('/block/:id',verifyProfile,blockUser)
router.post('/unblock/:id',unblockUser)  
router.get('/listOfBlocked/:id', listBlockedUsers);
router.post('/unfriend/:id',verifyProfile,unfriend) 
router.delete('/cancelTheRequest/:id',verifyProfile,cancelSentRequest)
router.get('/getProfileByUserID/:id',verifyUser,getProfileByUserID)
// router.get('/listOfRequests/:profileId',requestListOfUser)
router.get('/listOfRequests/:id',verifyProfile, requestListOfUser);
router.put('/viewedOtherProfile/:id',verifyProfile,addViewedProfile)
router.get('/viewedList/:id',verifyProfile,listOfUserViwedMyProfile)
router.get('/listOfSentRequest/:id',verifyProfile,listOfSentRequest)
router.get('/listOfAccepted/:id',verifyProfile,listOfAccepted)
router.get('/listOfRejection/:id',verifyProfile,listOfRejection)
router.get('/connection-status/:id/:otherUser',verifyProfile,findConnectionStatus);
router.get('/nearbyUser/:id',verifyProfile,nearbyProfile);
router.get('/designationUsers/:id',verifyProfile,professionProfile);
router.get('/qualicationUsers/:id',verifyProfile,qualificationProfile);
router.post('/shortListTheProfile/:id',verifyProfile,shortListTheProfile);
router.get('/sortedProfile/:id',sortedProfile)
router.delete('/cancelshortListTheProfile/:id/:otherProfile',verifyProfile,cancelShortListTheProfile);
router.get('/shortListedList/:id',verifyProfile,shortListedList);
router.get('/shortListedListOfAUser/:id/:Otherid',verifyProfile,shortListedListOfAUser);
router.get('/shortListedBy/:id',verifyProfile,shortListedListedBy);
router.put('/savePreferences/:id',verifyProfile,updateProfilePreference)
router.put('/updateFilter/:id',verifyProfile,filterUpdate)
router.get('/filter/:id',getFilteredProfiles)



export default router