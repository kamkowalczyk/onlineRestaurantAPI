const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require('./routes/auth');
const menuProductRoute = require('./routes/MenuProduct')


const app = express();
dotenv.config();



mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("DBConnection is successsfull."))
     .catch((error)=>{
         console.log(error);
     });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/menuProducts", menuProductRoute);


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running and listening at port ${process.env.PORT}`);
})