import User from "../../db/Schema/UserSchema.js";
import Profile from "../../db/Schema/UserProfile.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import checkToken from "../../middleware/checktoken.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const isUser = await User.findOne({ username: body.username });
  if (isUser) {
    return res.json("username already taken");
  }
  if (body.password != body.confirmpassword) {
    return res.json("password not match");
  }

  const hashedpassword = await bcrypt.hash(body.password, 2);
  body.password = hashedpassword;

  const detail = await User.create(body);
  res.json({ message: "sucessfuly sign", detail: detail });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user1 = await User.findOne({
    username: body.username,
  });
  const prof = await Profile.findOne({ user: user1 });
  if (!prof) {
    return res.json("username not found");
  }
  const isMatching = await bcrypt.compare(body.password, user1.password);
  if (!isMatching) {
    return res.status(401).json({ message: "password incorrect" });
  }

  const token = jwt.sign(
    {
      id: prof._id,
      role: "USER",
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  res.status(201).json({ message: "login sucess", prof: prof, token: token });
});

//post profile data
router.post("/profile", async (req, res) => {
  const body = { ...req.body };
  const pro = await Profile.create(body);
  if (pro.gender) {
    return res.json({ message: "data entered", pro: pro });
  } else {
    return res.json({ message: "invalid data" });
  }
});

//get user profile
// router.get("/profile/:id", checkToken(["USER"]), async (req, res) => {
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params; //User id
  const user = await Profile.findById(id).populate(["user", "job", "reg"]); //User id
  // user.password = "";
  res.status(200).json(user);
});

export default router;
