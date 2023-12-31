const express=require("express");
const {register,getUser,Login, logout,imageUpload,resetpassword,forgotpassword,editDeatils} =require("../controllers/auth");
const {getAccesToRoute}=require("../middlewares/errors/authorization/auth");
const {profileimageupload} = require('../middlewares/libraries/profileimageupload');




const router=express.Router();

router.post("/register",register);
router.get("/profile",getAccesToRoute,getUser);
router.post("/login",Login);
router.get("/logout",getAccesToRoute,logout);
router.post("/upload",[getAccesToRoute,profileimageupload.single("profile_image")],imageUpload);
router.post("/forgotpassword",forgotpassword);
router.put("/resetpassword",resetpassword);
router.put("/edit",getAccesToRoute,editDeatils);






module.exports=router;