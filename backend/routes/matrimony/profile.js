import express from 'express'
import { acceptRequest, addViewedProfile, cancelSentRequest, createProfile, findConnectionStatus, getProfileByUserID, listOfAccepted, listOfRejection, listOfSentRequest, nearbyProfile, qualificationProfile, rejectTheRequest, requestListOfUser, reRegisterProfile, searchProfiles, sendRequest, shortListedList, shortListedListedBy, shortListTheProfile, updateProfile, viewAUser } from '../../controllers/matrimonyProfile.js'
import { verifyProfile, verifyUser } from '../../utils/verifyToken.js';
const router = express.Router()

router.post('/createProfile/:id',verifyUser,createProfile)
router.get('/searchProfiles', searchProfiles);
router.get('/getProfile/:id',viewAUser);
router.patch('/reRegistration/:id',verifyProfile,reRegisterProfile)
router.put('/updatetheProfile/:id',verifyProfile,updateProfile)
router.post('/sendRequest/:id',verifyProfile,sendRequest)
router.post('/acceptRequest/:id',verifyProfile,acceptRequest) 
router.post('/rejectTheRequest/:id',verifyProfile,rejectTheRequest) 
router.delete('/cancelTheRequest/:id',verifyProfile,cancelSentRequest)
router.get('/getProfileByUserID/:id',verifyUser,getProfileByUserID)
// router.get('/listOfRequests/:profileId',requestListOfUser)
router.get('/listOfRequests/:id',verifyProfile, requestListOfUser);
router.patch('/viewedOtherProfile/:id',verifyProfile,addViewedProfile)
router.get('/listOfSentRequest/:id',verifyProfile,listOfSentRequest)
router.get('/listOfAccepted/:id',verifyProfile,listOfAccepted)
router.get('/listOfRejection/:id',verifyProfile,listOfRejection)
router.get('/connection-status/:id/:otherUser',verifyProfile,findConnectionStatus);
router.get('/nearbyUser/:id',verifyProfile,nearbyProfile);
router.get('/qualicationUsers/:id',verifyProfile,qualificationProfile);
router.post('/shortListTheProfile/:id',verifyProfile,shortListTheProfile);
router.get('/shortListedList/:id',verifyProfile,shortListedList);
router.get('/shortListedBy/:id',verifyProfile,shortListedListedBy);



export default router