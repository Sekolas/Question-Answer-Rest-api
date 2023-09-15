const User  = require('../../models/user');
const  CustomError  = require('../../helpers/database/error.js/CustomError');
const expressAsyncHandler = require('express-async-handler');
const Question = require('../models/question');
const Answer = require('../routers/answer');



const checkUserList=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    if(!user){
        return next(new CustomError("there is no such user",404));
        
    }
    next();
});


const checkQuestionExist=expressAsyncHandler(async(req,res,next)=>{
    const question_id=req.params.id || req.params.question_id;
    const {id}=req.params;
    const question=await Question.findById(id);
    if(!question){
        return next(new CustomError("there is no question with that id",404));
        
    }
    next();
});

const checkQuestionAndanswerExist=expressAsyncHandler(async(req,res,next)=>{
    const question_id=req.params.question_id;
    const answer_id=req.params.answer_id;
    const answer=await Answer.findOne({
        _id:answer_id,
        question:question_id

    })
    if(!answer){
        return next(new CustomError("there is no answer",400));
    }
    next();
});

module.exports={
    checkUserList,
    checkQuestionExist,
    checkQuestionAndanswerExist,
}
