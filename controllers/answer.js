const Question = require("../models/question");
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");
c;
const Answer = require("../routers/answer");
const answer = require("../models/answer");
const question = require("../models/question");

const addAnswerToQuesiton = asyncError(async (req, res, next) => {
  const { Question_id } = req.params;
  const { user_id } = req.user.id;
  const { informaiton } = req.body;
  const answer = await Answer.create({
    ...informaiton,
    question: Question_id,
    user: user_id,
  });
  return res.status(200).json({
    succes: true,
    data: answer,
  });
});

const getAllanswers = asyncError(async (req, res, next) => {
  const { Question_id } = req.params;
  const question = await Question.findById(Question_id);
  const answers = question.answers;

  return res.status(200).json({
    succes: true,
    data: answers,
  });
});

const getSingleAnswer = asyncError(async (req, res, next) => {
  const { answer_id } = req.params;
  const answer = await Answer.findById(answer_id)
    .populate({
      path: "question",
      select: "title",
    })
    .populate({
      path: "user",
      select: "name",
    });

  return res.status(200).json({
    succes: true,
    data: answer,
  });
});

const editAnswer = asyncError(async (req, res, next) => {
    const { answer_id } = req.params;
    const {content}=req.body;
    let answer=await Answer.findById(answer_id);

    answer.content=content;
    await Answer.save();
  
    return res.status(200).json({
      succes: true,
      data: answer,
    });
});

const deleteAnswer = asyncError(async (req, res, next) => {
    const { answer_id } = req.params;
    const {Question_id}=req.params;

    await answer.findByIdAndRemove(answer_id);
    const question=await Question.findById(Question_id);
    question.answers.splice(question.answers.indexOf(answer_id),1);

    await question.save();
  
    return res.status(200).json({
      succes: true,
      message:"answer deleted successfully"
    });
});

module.exports = {
  addAnswerToQuesiton,
  getAllanswers,
  getSingleAnswer,
  editAnswer,
  deleteAnswer
};
