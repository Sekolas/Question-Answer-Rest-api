const express=require("express");
const {getAllQuestions,askNewQuesiton,getSingleQuesiton} =require("../controllers/question");
const router=express.Router();
const {getAccesToRoute,getQuestionOwnerAccess}=require("../middlewares/errors/authorization/auth");
const { checkQuestionExist } = require("../middlewares/database/databaseErrorHelpers");




router.post("/ask",getAccesToRoute,askNewQuesiton);
router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist,getSingleQuesiton);
router.put("/:id/edit",[getAccesToRoute,checkQuestionExist,getQuestionOwnerAccess],editQustion);




module.exports=router;