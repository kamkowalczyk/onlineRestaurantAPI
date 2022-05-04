const router = require("express").Router();
const {verifyJwtToken} = require("./verifyJwtToken");

router.put("/:id", verifyJwtToken, (req, res)=>{
    
})



module.exports = router