const CustomError = require("../helpers/database/error.js/CustomError");
const jwt=require("jsonwebtoken");

const getAccsRoute=(req,res,next)=>{
    console.log(req.headers.authorization);
    next();
}

module.exports={
    getAccesToRoute
}