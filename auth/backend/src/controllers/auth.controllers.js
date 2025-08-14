import User from "../models/user.model.js"

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
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

let login=(req,res,next)=>{
    //TODO: check user is there or not
    //TODO:if user is not there ask him to register first
    //TODO: match password with hashed password in db
    //TODO: return user if password is a match
}

export {
    register,login
}