// import { IncomingMessage } from "http";
import { Schema, model } from "mongoose";
// import { debugPort } from "process";

const PersonSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  age: {
    type: Number,
  },
  dob: {
    type: Number,
  },
  hobbies: {
    type: String,
  },
  smoking: {
    type: String,
  },
  drinking: {
    type: String,
  },
  qualification: {
    type: String,
  },
  propic: {
    type: String,
  },
  multipleimg: {
    type: String,
  },
  reel: {
    String,
  },
});

const Person = model("Person", PersonSchema);

export default Person;
