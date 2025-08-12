import mongoose from "mongoose";

//db connection
export default async function db() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskDB");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}
