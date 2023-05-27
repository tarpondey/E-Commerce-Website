const { compare } = require("bcryptjs");
const { hashpassword ,comapre} = require("../middleware/helper");
const Usermodel = require("../models/usermodels")
const Ordermodel=require("../models/Ordermodel")
exports.register=async(req,res)=>{
    try{
        const {name,email,phone,password ,secretanswer,address}= req.body;
        if(!name || !email || !phone || !password || !secretanswer || !address)
        {
            return res.status(400).send("pls fillall the fields.");
        }
        const userexist= await Usermodel.findOne({email})
        if(userexist){
            return res.status(200).send("User already Exist. Please Login.")
        }
        const hash= await hashpassword(password);
        const newuser= new Usermodel({name,email,phone, password:hash,secretanswer,address});
        const usersave=await newuser.save();
        res.status(200).send({message:"user register sucessfully",usersave});

    }catch(error)
    {
        res.status(400).send({message:"user register failed"},error);
    }
}


//Login route function

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("Please fill all the field.")
        }
        const user =await Usermodel.findOne({email})
        if(!user){
            return res.status(400).send("User doesn't exist. Please SignUp at first.")
        }
        const match=await compare(password,user.password);
        if(!match){
            return res.status(400).send({message:"Invalid Password"})
        }
        const token=await user.generatetoken();
        res.status(200).send({message:"User Login Successfully.",token,user});


    } catch(error){
        return res.status(400).send({message:"User login failed",error})
    }
}


//forgot password
exports.forgotpassword=async(req,res)=>{
    try{
        const {email,secretanswer,newpassword} =req.body;
        if(!email || !secretanswer || !newpassword){
            return res.status(400).send({message:"pls fill all the field."})
        }
        const user = await Usermodel.findOne({email:email,secretanswer:secretanswer})
        if(!user){
            return res.status(400).send({message:"User not existed. Please signUp."})
        }
        const hash=await hashpassword(newpassword);
        const updatepassword=await Usermodel.findByIdAndUpdate(user._id,{password:hash},{new:true});
        res.status(200).send({message:"password Reset Sucessfully."})

    }
    catch(error){
        res.status(400).send({message:"forgot password failed",error})
    }
}

//edit user
exports.edituser=async(req,res)=>{
    try {
        const {name,email,phone,address}=req.body;
        if(!name || !email || !phone || !address)
        {
            return res.status(400).send({message:"Please fill all the field."})
            
        }
        const updateuser=await Usermodel.findByIdAndUpdate(req.user._id,{name,email,phone,address},{new:true})
        res.status(200).send({message:"user updated successfully.",updateuser});
    } catch (error) {
        res.status(400).send({ message:"User updation failed.",error})
    }
}

//user order function
exports.getorderfunction=async(req,res)=>{
    try {
        const orders= await Ordermodel.find({buyer:req.user._id}).populate("products").populate("buyer","name");
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
}
//admin order function
exports.getallorderfunction= async(req,res)=>{
    try {
        const orders= await Ordermodel.find({}).populate("products").populate("buyer", "name").sort({createdAt:"-1"});
        res.json(orders);
    } catch (error) {
        res.status(400).send(error);
    }
}

//orderstaus function
exports.orderstatusfunction=async(req,res)=>{
    try {
        const {id}=req.params;
        const {status}=req.body;
        const orders=await Ordermodel.findByIdAndUpdate(id,{status},{new:true});
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}