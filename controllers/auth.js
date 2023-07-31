const User = require("../models/user");
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");

const register = asyncError(async (req, res, next) => {
  const name = "ARİF Kemer";
  const email = "Leyla@gmail.com";
  const password = "123456";

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    succes: true,
    data: user,
  });

});

const errorTest = (req, res, next) => {
  return next(new CustomError("custom error hata oluştu", 400));
};
module.exports = {
  register,
  errorTest,
};
