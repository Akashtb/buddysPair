import express from 'express'
import { createJobSeeker } from '../../controllers/jobPortal.js'
const router = express.Router()
 
router.post('/createJobSeeker',createJobSeeker)
export default router