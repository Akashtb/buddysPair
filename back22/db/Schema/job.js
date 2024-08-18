import { Schema, model } from "mongoose";

const EmployeeSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reg: {
    type: Schema.Types.ObjectId,
    ref: "Person",
  },
  company: {
    type: String,
  },
  designation: {
    type: String,
  },
  location: {
    type: String,
  },
  title: {
    type: String,
  },
  expertlevel: {
    type: String,
  },
});
const Employee = model("Employee", EmployeeSchema);

export default Employee;
