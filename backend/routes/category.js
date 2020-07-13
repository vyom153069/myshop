const express=require("express")
const router=express.Router();

const {getCategoryById,createCategory}=require("../controllers/category");
const {isAuthenticated,isAdmin,isSignedIn}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");


//PARAMS
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//ACTUAL ROUTES
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)

module.exports=router;