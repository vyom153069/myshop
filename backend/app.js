require("dotenv").config();
const mongoose=require('mongoose');
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");

//MY ROUTES
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const categoryRoutes=require("./routes/category");
//DATABASE CONNECTIVITY
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log("DB CONNECTED")
})

// MIDDLE WARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);

//PORT
const port=process.env.PORT||8000;
//STARTING OF SERVER
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
});

