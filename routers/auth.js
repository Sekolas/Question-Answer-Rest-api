const express=require("express");
const {register,getUser} =require("../controllers/auth");
const {getAccesToRoute}=require("../middlewares/errors/authorization/auth");


const router=express.Router();

router.post("/register",register);

router.get("/profile",getAccesToRoute,getUser);




module.exports=router;