const express=require("express");
const {getAllQuestions,askNewQuesiton,getSingleQuesiton,editQeustion,deleteQuestion,likeQuestion,undolikeQuestion} =require("../controllers/question");
const router=express.Router();
const {getAccesToRoute,getQuestionOwnerAccess}=require("../middlewares/errors/authorization/auth");
const { checkQuestionExist } = require("../middlewares/database/databaseErrorHelpers");




router.post("/ask",getAccesToRoute,askNewQuesiton);
router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist,getSingleQuesiton);
router.put("/:id/edit",[getAccesToRoute,checkQuestionExist,getQzuestionOwnerAccess],editQeustion);
router.delete("/:id/delete",[getAccesToRoute,checkQuestionExist,getQzuestionOwnerAccess],deleteQuestion);
router.get("/:id/like",[getAccesToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/undolike",[getAccesToRoute,checkQuestionExist],undolikeQuestion);




module.exports=router;