const express=require("express");
const {addAnswerToQuesiton,getAllanswers,getSingleAnswer,editAnswer,deleteAnswer} =require("../controllers/answer");
const {getAccesToRoute, getAnswerOwnerAccess}=require("../middlewares/errors/authorization/auth");
const { checkQuestionAndanswerExist } = require("../middlewares/database/databaseErrorHelpers");

const router=express.Router({mergeParams:true});

router.post("/",getAccesToRoute,addAnswerToQuesiton);
router.get("/",getAccesToRoute,getAllanswers);
router.get("/:answer_id",checkQuestionAndanswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionAndanswerExist,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAndanswerExist,getAnswerOwnerAccess],deleteAnswer);





module.exports=router;
