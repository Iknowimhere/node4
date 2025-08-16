import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

let generateToken=(id)=>{
    return jwt.sign({id,role:"user"},"topSecret",{
        expiresIn:'1d'
    }) 
}

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
        let token=generateToken(newUser._id)
        res.status(200).json({username:newUser.username,email:newUser.email,token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

let login=async(req,res,next)=>{
    let {email,password}=req.body
    try{
        let existingUser=await User.findOne({email})
        if(!existingUser){
            res.status(400).json({message:"User doesnt exist please signup"})
            return;
        }
        let isMatch=await bcrypt.compare(password,existingUser.password)
        if(!isMatch){
            res.status(400).json({message:"Password dosent match!!"})
            return; 
        }
        let token=generateToken(existingUser._id)
        res.status(200).json({username:existingUser.username,email:existingUser.email,token})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export {
    register,login
}