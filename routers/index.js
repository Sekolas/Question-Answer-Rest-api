const express=require("express");
const quesiton=require("./question");
const auth=require("./auth");
const user = require('./user');
const admin=require("./admin");
const answer=require("answer");


const router=express.Router();

router.use("/question",quesiton);
router.use("/auth",auth);
router.use("/users",user);
router.use("/admin",admin);








module.exports=router;
