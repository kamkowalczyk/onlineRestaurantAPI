const router = require("express").Router();
const Order = require("../models/Order");
const {verifyJwtToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyJwtToken");


 //Create
 router.post("/", verifyJwtToken,  async (req,res)=>{
    const newOrder= new Order(req.body)
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
     //Update
    router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
      
        try {
          const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedOrder);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
     //Delete
    router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
        try {
          await Order.findByIdAndDelete(req.params.id);
          res.status(200).json("Order has been deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //Get order
      router.get("/menuProducts/:orderId", verifyTokenAndAuthorization , async (req, res) => {
        try {
          const orders = await Order.find({orderId: req.params.orderId});
          res.status(200).json(orders);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //Get all orders
      router.get("/", verifyTokenAndAdmin, async (req, res) => {
       try {
           const orders = await Order.find();
           res.status(200).json(orders);
       } catch (error) {
           res.status(500).json(error);
       }
      });
      //Get income
      router.get("/income", verifyTokenAndAdmin, async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMongth()-1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMongth()-1));

        try {
            const income  =await Order.aggregate([
                {$match:{createdAt:{$gte:previousMonth}}},
                {
                    $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                    },
                    
                        $group:{
                            _id:"$month",
                            total:{$sum:"$sales"}
                        
                    },
                },
            ]);
            res.status(200).json(income);
        } catch (error) {
            res.status(500).json(error);
        }
       });

        //Get income with date
      router.get("/incomeWithDate", verifyTokenAndAdmin, async (req, res) => {
      
        try {
            const incomeWithDate  =await Order.find({
              createdAt:{$gte:req.query.from, $lte:req.query.to}
            }).limit(req.query.limit).sort({createdAt:"desc"});
           
            res.status(200).json(incomeWithDate);
        } catch (error) {
            res.status(500).json(error);
        }
         
       });

module.exports = router