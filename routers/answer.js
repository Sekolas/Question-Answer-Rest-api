const express=require("express");
const {addAnswerToQuesiton,getAllanswers} =require("../controllers/answer");
const {getAccesToRoute}=require("../middlewares/errors/authorization/auth");

const router=express.Router({mergeParams:true});

router.get("/",getAccesToRoute,addAnswerToQuesiton);
router.get("/",getAccesToRoute,getAllanswers);


module.exports=router;
