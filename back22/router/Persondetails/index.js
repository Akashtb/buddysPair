import Person from "../../db/Schema/persondetail.js";
// import Seeker from "../../db/Schema/job.js";
import checkToken from "../../middleware/checktoken.js";
import User from "../../db/Schema/UserSchema.js";
import express from "express";

const router = express.Router();

//to get user signup details
// router.get("/:id", checkToken("USER"), async (req, res) => {
router.get("/:id", async (req, res) => {
  const { id } = req.params; //User id
  const user = await User.findById(id); //User id
  // user.password = "";
  res.json(user);
});

//to post registration details
router.post("/", async (req, res) => {
  const body = { ...req.body };
  // const { id } = req.params;
  const details = await Person.create(body);
  res.json({ message: "data inserted", details: details });
});

//to get registration details
router.get("/register/:id", async (req, res) => {
  const { id } = req.params; //User id
  const pers = await Person.findById(id).populate(["user"]); //User id
  // user.password = "";
  res.json(pers);
});

export default router;
