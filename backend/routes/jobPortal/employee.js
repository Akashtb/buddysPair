import express from "express"
import { creatEmployee } from "../../controllers/jobPortal.js";
import { verifyRegisterToken, verifyToken } from "../../utils/verifyToken.js";
const router = express.Router()

router.post('/createEmployee',verifyRegisterToken,creatEmployee);

export default router
