const jwt = require("jsonwebtoken")


const verifyJwtToken = (req,res, next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        jwt.verify(token, process.env.JWT_SECRET, (error, data)=>{
            if(error) res.status(401).json("Invalid token.");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Unauthorized user.");
    }
}
module.exports={verifyJwtToken};