import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  userIdRef: { type: String },
  skills: [{ type: String }],
  locationPreference: { type: String },
  salaryExpectation: { type: Number },
  email: { type: String},
  phone: { type: String }
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
export default JobSeeker