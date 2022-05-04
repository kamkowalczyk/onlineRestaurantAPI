const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        menuProducts:[{
            menuProductId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],
      amount:{type:Number, required:true},
      address:{type:Object, required:true},
      status:{type:String, default:"Pending approval."},
    },
    {timestamps:true}
)
module.exports = mongoose.model("Order", OrderSchema);