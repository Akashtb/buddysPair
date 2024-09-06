import express from 'express'
import { createEmployer } from '../../controllers/jobPortal.js'
import {verifyRegisterToken, verifyToken, verifyUser} from '../../utils/verifyToken.js'
const router = express.Router()

router.post('/createEmployer',verifyRegisterToken,createEmployer)

export default router