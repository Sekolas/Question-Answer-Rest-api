const express=require("express");
const {register,tokentest} =require("../controllers/auth");
const {getAccesToRoute}=require("../middlewares/errors/authorization/auth");


const router=express.Router();

router.post("/register",register);

router.get("/tokentest",getAccesToRoute,tokentest);


module.exports=router;