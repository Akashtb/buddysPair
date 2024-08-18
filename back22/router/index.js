import express from "express";
import UserRouter from "./UserRouter/index.js";
import jobRouter from "./jobRouter/index.js";
import Persondetails from "./Persondetails/index.js";
import ProfileRouter from "./ProfileRouter/index.js";
// import ChatRouter from "./ChatRouter/index.js";
import routerr from "../middleware/passport.js";
// import ProductRouter from "./ProductRouter/index.js";
import imageRouter from "./imageRouter/index.js";

const router = express.Router();

router.use("/user", UserRouter);
router.use("/user/job", jobRouter);
router.use("/user/person", Persondetails);
router.use("/user/profile", ProfileRouter);
// router.use("/user/chat", ChatRouter);
router.use("/pass", routerr);
// router.use("/product", ProductRouter);
router.use("/image", imageRouter);

export default router;
