import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/dating")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e.message);
  });
export default mongoose;
