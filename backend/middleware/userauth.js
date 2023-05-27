const Usermodel =require("../models/usermodels")
const jwt = require("jsonwebtoken")
require("dotenv").config();

// Userlogin Auth
exports.authlogin=(req,res,next)=>{
    try{
        const decode= jwt.verify(req.headers.authorization,process.env.KEY);
        req.user=decode;
        next();

    } catch(error){
        console.log(error)
        return res.status(400).send({message:"Plsease Login first."})
    }
}

//User Admid panel
exports.Admin=async(req,res,next)=>{
    try {
        const user= await Usermodel.findById(req.user._id);
        if(user.role!=1){
            return res.status(400).send({message:"Unauthorized Access"})
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
         res.status(400).send({message:"Unauthorized Access"})
    }
}