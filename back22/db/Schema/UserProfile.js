import { Schema, model } from "mongoose";
import { type } from "os";
// import { type } from "os";

const ProfileSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    reg: {
      type: Schema.Types.ObjectId,
      ref: "Person",
    },

    gender: { type: String },
    religion: { type: String },
    motherTongue: { type: String },
    about: { type: String },
    height: { type: Number },
    weight: { type: Number },
    bodytype: { type: String },
    marrital: { type: String },
    income: { type: Number },
    fathername: { type: String },
    fatherjob: { type: String },
    mothername: { type: String },
    motherjob: { type: String },
    siblngs: { type: String },
    address: { type: String },
    siblingsname: { type: String },
    marriedsiblings: { type: String },
    expectaion: { type: String },
    disability: { type: String },
    familytype: { type: String },
    complexion: { type: String },
    cast: { type: String },
  },
  { timestamps: true }
);

const Profile = model("Profile", ProfileSchema);

export default Profile;
