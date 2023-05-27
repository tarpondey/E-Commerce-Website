const Productmodel = require("../models/Productmodels")
const Ordermodel=require("../models/Ordermodel")
const braintree= require("braintree")
require("dotenv").config();


// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:process.env.MERCHANT_Id,
    publicKey:process.env.PUBLIC_Key,
    privateKey:process.env.PRIVATE_Key,
})

exports.Addproduct = async (req, res) => {
    try {
        const { name, description, category, price, quantity, shipping } = req.body;
        const img = req.file.filename;
        if (!name || !description || !category || !price || !quantity || !img) {
            return res.status(400).send("Please all the field.")
        }
        const newproduct = new Productmodel({
            name, description, category, price, quantity, shipping, img
        })

        const saveproduct = await newproduct.save();
        res.status(200).send({ message: "successfull created products.", saveproduct })

    } catch (error) {
        res.status(404).send({ error, message: "error in creating product." })
    }
}

exports.Allproduct = async (req, res) => {
    try {
        const products = await Productmodel.find({}).sort({ createdAt: -1 })

        res.status(200).send({ message: "All Products get successfully", products })

    } catch (error) {
        res.status(400).send({ message: "error to get all the products", error })
    }
}

exports.singleproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Productmodel.findOne({ _id: id });
        res.status(200).send({ message: "Single Product found", product })
    } catch (error) {
        res.status(400).send({ message: "error to get single product", error })
    }
}

//Edit product
exports.Editproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price, quantity, img } = req.body;
        const file = req.file ? req.file.filename : img;
        const updateproduct = await Productmodel.findByIdAndUpdate(
            { _id: id }, { name, description, category, price, quantity, img: file }

        );
        res.status(200).send(updateproduct);
    } catch (error) {
        res.status(404).send({ message: "error to get the product", error })
    }
}

//delete product
exports.Deleteproduct=async (req,res)=>{
    try {
        await Productmodel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({message:"Product deleted successfully"})
    } catch (error) {
        res.status(400).send({message:"Error in deleting the product",error});
    }
}

//breaintree token function
exports.braintreetokenfunction=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err);
            }else{
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

//payment processing
exports.braintreepaymentfunction=async(req,res)=>{
    try {
        const {cart,nonce}=req.body;
        let total=0;
        cart.map((i)=>{
            total+=i.price;
        })
        let newtransaction =gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },function(error,result){
            if(result){
                const order=new Ordermodel({products:cart,payment:result,buyer:req.user._id}).save();
                res.json({ok:true});
            }
            else{
                res.status(500).send(error);
            }
        })
    } catch (error) {
        console.log(error);
    }
}