const express=require("express");
const quesiton=require("./question");
const auth=require("./auth");


const router=express.Router();

router.use("/question",quesiton);
router.use("/auth",auth);





module.exports=router;
