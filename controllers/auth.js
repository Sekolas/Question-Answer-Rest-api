const User = require("../models/user");
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");
const sendJwtToClient=require("../helpers/authorization/tokenHelpers");
const {getAccesToRoute}=require("../middlewares/errors/authorization/auth");

const register = asyncError(async (req, res, next) => {

  const {name,email,password,role}=req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendJwtToClient.SendJwt(user,res);

});

const tokentest=(req,res,next)=>{
  res
  .json({
    success:true
  })
}




module.exports = {
  register,
  tokentest
};
