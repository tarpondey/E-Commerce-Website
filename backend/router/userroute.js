const express=require("express");
const { register,login,forgotpassword,edituser,getorderfunction,getallorderfunction,orderstatusfunction} = require("../controller/usercontroller");
const route= express.Router()
const {authlogin, Admin} = require("../middleware/userauth")

route.post("/register",register)
route.post("/login",login)
route.post("/forgotpassword",forgotpassword)

route.get("/loginverify",authlogin,(req,res)=>{
    res.send({ok:"user verified sucessfully."})
})
route.get("/adminverify",authlogin,Admin,(req,res)=>{
    res.send({ok:"user verified sucessfully."})
})


route.put("/edit",authlogin,edituser)
//user orders
route.get("userorders",authlogin,getorderfunction);
//admin orders
route.get("/allorders",authlogin,Admin,getallorderfunction);
//status update
route.put("/orderstatus/:id",authlogin,Admin,orderstatusfunction);
module.exports=route;