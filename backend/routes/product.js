const { request } = require("express");

const express=require("express");
const router=express.Router();

const {getProductById,creatProduct}=require("../controllers/product");
const { isSignedIn,isAuthenticated,isAdmin }=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

//ALL OF PARAMS
router.param("userId",getUserById);
router.param("productId",getProductById);

//ALL OF ACTUAL ROUTES
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,creatProduct);

module.exports=router;