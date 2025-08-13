import mongoose from "mongoose";

let authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username field is required"],
      trim: true,
      minLength: [4, "minimum 4 characters required for username"],
    },
    email: {
      type: String,
      required: [true, "email field is required"],
      unique:true
    },
    password: {
      type: String,
      required: [true, "password field is required"],
      minLength: [6, "minimum 6 characters required for password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "confirm password field is required"],
      minLength: [6, "minimum 6 characters required for confirm password"],
    },
    role:{
        type:String,
        default:"user"
    }
  },
  { timestamps: true } //createdAt and updatedAt
);


let User=mongoose.model("User",authSchema)

export default User;