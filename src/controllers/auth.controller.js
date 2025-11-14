const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
async function registerController(req,res){

    const {username,password} = req.body;

    const userExists = await userModel.findOne({
        username
    })

    if(userExists){
        return res.status(409).json({
            message:"User already Exists with this Username"
        })
    }

    const userCreation = await userModel.create({
        username,
        password: await bcrypt.hash(password,10)
        
    })

    const token = jwt.sign({
        id:userCreation._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:"User Created Successfully",
        userCreation
    })
}

async function loginController(req,res){
    const {username,password} = req.body;


    const isUser = await userModel.findOne({
        username
    })

    if(!isUser){
        return res.status(400).json({
            message:"User not Found"
        })
    }

    // const isPasswordValid = isUser.password === password;
    // const isPasswordValid = await bcrypt.compare(isUser.password,password) // ese nahi hoga error aega 
        const isPasswordValid = await bcrypt.compare(password,isUser.password) 
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Password incorrect"
        })
    }

    const token = jwt.sign({
        id:isUser._id
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(200).json({
        message:"User loggedin successfully",
        user:{
            username:isUser.username,
            id:isUser._id
        }
    })
}


module.exports = {
    registerController,loginController
}