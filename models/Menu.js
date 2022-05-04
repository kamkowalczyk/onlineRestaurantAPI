const mongoose = require("mongoose");

const MenuProductsSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        description:{type: String, required:true},
        img:{type:String, required:true},
        calories:{type:String},
        categories:{type:Array, required:true},
        weight:{type:Number},
        price:{type:Number, required:true}  
    },
    {timestamps:true}
)
module.exports = mongoose.model("MenuProducts", MenuProductsSchema);