import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username field is required"],
      trim: true,
      minLength: [3, "minimum 3 characters required for username"],
    },
    email: {
      type: String,
      required: [true, "email field is required"],
      unique:true,
      validate:{
        validator:function(value){
          return value.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        },
        message:"Enter proper email"
      }
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
      validate:{
        validator:function(value){
          return value===this.password
        },
        message:"password and confirm password doesnt match!"
      }
    },
    role:{
        type:String,
        default:"user"
    }
  },
  { timestamps: true } //createdAt and updatedAt
);

//middleware are functions and they are also called
//  pre hooks--they run before mongoose query--they are on schema level
authSchema.pre("save",async function(next){
  if(this.isModified('password')){
    //hash the password
    this.password=await bcrypt.hash(this.password,10)
    this.confirmPassword=undefined;
    next()
  }else{
    throw new Error("error hashing password")
  }
})


let User=mongoose.model("User",authSchema)

export default User;