const mongoose=require("mongoose")


const Productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    shipping:{
        type:Boolean,
    },
},{timestamps:true})

const Productmodel=mongoose.model("Product",Productschema)

module.exports=Productmodel;