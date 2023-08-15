const User = require("../models/user");
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const { getAccesToRoute } = require("../middlewares/errors/authorization/auth");
const {
  validateUserİnput,
  comparePassword,
} = require("../helpers/input/inputhelpers");

const register = asyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});

const getUser = (req, res, next) => {
  res.status(200)
  .json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    }
  })
};

const Login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserİnput(email, password)) {
    return next(new CustomError("please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("check your credenitals", 400));
  }

  sendJwtToClient(user, res);
});

const logout = asyncError(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie("acces_token", token, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV == "development" ? false : true,
    })
    .json({
      success: true,
      message: "logout succesful",
    });
});

const imageUpload = asyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "img upload succesful",
    data: user,
  });
});

const forgotpassword = asyncError(async (req, res, next) => {
  const resetmail=req.body.email;
  const user=await User.findOne({email:resetmail});
  if(!user){
    return next(new CustomError("there is no user with that email",400));
  }
  const resetPasswordtoken=user.resetPasswordtoken();
  res.status(200).json({
    message:"token send to your email"

  })
});

module.exports = {
  register,
  getUser,
  Login,
  logout,
  imageUpload,
  forgotpassword
};
