import express from 'express'
import { createEmployer } from '../../controllers/jobPortal.js'
const router = express.Router()

router.post('/createEmployer',createEmployer)

export default router