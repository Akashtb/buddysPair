import express from 'express'
import { createJobSeeker } from '../../controllers/jobPortal.js'
import { verifyRegisterToken} from '../../utils/verifyToken.js'
const router = express.Router()
 
router.post('/createJobSeeker',verifyRegisterToken,createJobSeeker)
export default router