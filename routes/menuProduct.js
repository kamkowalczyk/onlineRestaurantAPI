const router = require("express").Router();
const MenuProduct = require("../models/MenuProduct");
const { verifyTokenAndAdmin} = require("./verifyJwtToken");



 //Create
router.post("/", verifyTokenAndAdmin,  async (req,res)=>{
const newMenuProduct = new MenuProduct(req.body)
try {
    const savedProduct = await newMenuProduct.save();
    res.status(200).json(savedProduct)
} catch (error) {
    res.status(500).json(error)
}
})


 //Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
    try {
      const updatedMenuProduct = await MenuProduct.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMenuProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await MenuProduct.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get menuProduct
  router.get("/:id", async (req, res) => {
    try {
      const menuProduct = await MenuProduct.findById(req.params.id);
      res.status(200).json(menuProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get all menuProducts
  router.get("/",  async (req, res) => {
    const newQuery = req.query.new;
    const categoryQuery = req.query.category;
    try {
      let menuProducts;
      if(newQuery){
          menuProducts = await MenuProduct.find().sort({createdAt:-1}.limit(1))
      } else if(categoryQuery){
          menuProducts = await MenuProduct.find({categories:{
              $in:[categoryQuery],
          },
    });
      }  else{
          menuProducts = await MenuProduct.find();
      }
      res.status(200).json(menuProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router