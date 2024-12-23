const CustomError = require('../../../helpers/database/error.js/CustomError');
const js = require('jsonwebtoken');
const User = require("../models/user");
const { istokenİncluded,getAccesTokenFromHeader} = require('../../../helpers/authorization/tokenHelpers');
const expressAsyncHandler = require('express-async-handler');
const Question = require('../../../models/question');
const Answer = require('../routers/answer');




const getAccesToRoute=(req,res,next)=>{
    const {JWT_SECRET_KEY}=process.env;
    if(!istokenİncluded(req)){
        return next(new CustomError('you are not auth to acces',401));
        
    }
    const accestoken=getAccesTokenFromHeader(req);

    js.verify(accestoken,JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(new CustomError('you are not auth to acces',401));
        }
        req.user={
            id:decoded.id,
            name:decoded.name
        }
        next();
    });
};

const getAdminAccess=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.user;
    const user=await User.findById(id);

    if(user.role!=="admin") {
        return next(new CustomError("only admins acces that route",403));
    }
    next();

});

const getQuestionOwnerAccess=expressAsyncHandler(async(req,res,next)=>{
    const userId=req.user.id;
    const questionId=req.params.id;
    
    const question=await Question.findById(questionId);
    if(question.user!==userId){
        return next(new CustomError("only owner can handle this operation",403));

    }
    next();

});

const getAnswerOwnerAccess=expressAsyncHandler(async(req,res,next)=>{
    const userId=req.user.id;
    const answerid=req.params.answerid;
    
    const answer=await Answer.findById(answerid);
    if(answer.user!==userId){
        return next(new CustomError("only owner can handle this operation",403));

    }
    next();

});



module.exports={
    getAccesToRoute,
    getAdminAccess,
    getQuestionOwnerAccess,
    getAnswerOwnerAccess
};