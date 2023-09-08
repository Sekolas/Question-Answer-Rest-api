const Question = require('../models/question');
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");





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

})




module.exports={
    askNewQuesiton,
    getAllQuestions,
    getSingleQuesiton
}