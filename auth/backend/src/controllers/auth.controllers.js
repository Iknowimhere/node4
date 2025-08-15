import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

let register=async (req,res,next)=>{
    let {username,email,password,confirmPassword}=req.body
    try {
        let existingUser=await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"Already registered please try to login"})
            return;
        }
        let newUser=await User.create({
            username,
            email,
            password,
            confirmPassword
        })
        res.status(200).json({username:newUser.username,email:newUser.email})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

let login=async(req,res,next)=>{
    let {email,password}=req.body
    try{
        //TODO: check user is there or not
        let existingUser=await User.findOne({email})
        //TODO:if user is not there ask him to register first
        if(!existingUser){
            res.status(400).json({message:"User doesnt exist please signup"})
            return;
        }
        //TODO: match password with hashed password in db
        let isMatch=await bcrypt.compare(password,existingUser.password)

        if(!isMatch){
            res.status(400).json({message:"Password dosent match!!"})
            return; 
        }
        //TODO: return user if password is a match
        res.status(200).json({username:existingUser.username,email:existingUser.email})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export {
    register,login
}