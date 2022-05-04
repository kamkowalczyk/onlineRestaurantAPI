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
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        if(!user){
            res.status(401).json("Wrong username.");
        } 

        const descryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );

        const password = descryptedPassword.toString(CryptoJS.enc.Utf8)
        if(password!==req.body.password){
            res.status(401).json("Wrong password.");
        }
        const {newPassword, ...others}=user._doc;
        res.status(200).json(others);


    }
   
    catch(error){
        res.status(400).json(error)
    }
})


module.exports = router