const Question = require('../models/question');
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");
const question = require('../models/question');






const askNewQuesiton=asyncError(async(req,res,next)=>{

    const information=req.body;

    const question=await Question.create({
        ...information,
        user:req.user.id,
    })


    res
    .status(200)
    .json({
        succes:true,
        data:question
    });

});


const getAllQuestions=asyncError(async(req,res,next)=>{
    const questions=await Question.find();
    return res()
    .status(200)
    .json({
        succes:true,
        data:questions
    })

})

const getSingleQuesiton=asyncError(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    return res()
    .status(200)
    .json({
        succes:true,
        data:question
    })

});

const editQeustion=asyncError(async(req,res,next)=>{
    const {id}=req.params;
    const {title,content}=req.body;

    let question=await question.findById(id);
    question.title=title;
    question.content=content;

    question= await question.save();


    return res()
    .status(200)
    .json({
        succes:true,
        data:question
    })

});

const deleteQuestion=asyncError(async(req,res,next)=>{
    const {id}=req.params;

    await question.findByIdAndDelete(id);
    return res()
    .status(200)
    .json({
        succes:true,
        message:"delete succesful"
    });
});
const likeQuestion=asyncError(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    if(question.likes.includes(req.user.id)){
        return next(new CustomError("you already liked that",400));
    }
    question.likes.push(req.user.id);
    await Question.save();

    return res()
    .status(200)
    .json({
        succes:true,
        data:question
    });
});

const undolikeQuestion=asyncError(async(req,res,next)=>{
    const {id}=req.params;
    const question=await Question.findById(id);
    if(!question.likes.includes(req.user.id)){
        return next(new CustomError("you cant undo like opeation",400));
    }
    const index=question.likes.indexOf(req.user.id);
    question.likes.splice(index,1);

    await Question.save();

    return res()
    .status(200)
    .json({
        succes:true,
        data:question
    });
});




module.exports={
    askNewQuesiton,
    getAllQuestions,
    getSingleQuesiton,
    editQeustion,
    deleteQuestion,
    likeQuestion,
    undolikeQuestion

}