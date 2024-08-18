import Employee from "../../db/Schema/job.js";
// import Seeker from "../../db/Schema/job.js";
import express from "express";

const router = express.Router();

router.post("/employee", async (req, res) => {
  const body = { ...req.body };
  const job = await Employee.create(body);
  if (job.company) {
    return res.json({ message: "inserted", job: job });
  } else {
    return res.status(400).json({ false: "invalid data" });
  }
});

router.get("/employee/:id", async (req, res) => {
  const { id } = req.params; //User id
  const user = await Employee.findById(id).populate(["user", "reg"]); //User id
  // user.password = "";
  res.status(200).json(user);
});

router.post("/seeker", async (req, res) => {
  const body = { ...req.body };
  const job = await Employee.create(body);
  if (job.title) {
    return res.json({ message: "inserted", job: job });
  } else {
    return res.status(400).json({ false: "invalid data" });
  }
});

router.get("/seeker/:id", async (req, res) => {
  const { id } = req.params; //User id
  const user = await Employee.findById(id).populate(["user", "reg"]); //User id
  // user.password = "";
  res.status(200).json(user);
});
export default router;
