import express from 'express'
import { acceptRequest, createProfile, findConnectionStatus, getProfileByUserID, listOfAccepted, listOfRejection, listOfSentRequest, nearbyProfile, qualificationProfile, rejectTheRequest, requestListOfUser, searchProfiles, sendRequest, shortListedList, shortListedListedBy, shortListTheProfile, updateProfile, viewAUser } from '../../controllers/matrimonyProfile.js'
import MatrimonyProfileconnection from '../../models/ConnectedProfile.js';
import { verifyProfile, verifyUser } from '../../utils/verifyToken.js';
const router = express.Router()

router.post('/createProfile',createProfile)
router.get('/searchProfiles', searchProfiles);
router.get('/getProfile/:id',viewAUser);
router.put('/updatetheProfile/:id',verifyProfile,updateProfile)
router.post('/sendRequest/:id',verifyProfile,sendRequest)
router.post('/acceptRequest/:id',verifyProfile,acceptRequest) 
router.post('/rejectTheRequest/:id',rejectTheRequest) 
router.get('/getProfileByUserID/:id',verifyUser,getProfileByUserID)
// router.get('/listOfRequests/:profileId',requestListOfUser)
router.get('/listOfRequests/:id',verifyProfile, requestListOfUser);
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