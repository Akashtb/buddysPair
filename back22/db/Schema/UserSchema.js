import { Schema, model } from "mongoose";

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
