const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");


//Register

router.post("/register", async (req, res)=>{
    const newUser = new User({
        username:req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
    });
    try{
        const savedUser =  await newUser.save()
        res.status(201).json(savedUser) 
    }
    catch(error){
        res.status(500).json(error);
    }
   
});

//Login


module.exports = router