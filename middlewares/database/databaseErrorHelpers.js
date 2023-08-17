const User  = require('../../models/user');
const  CustomError  = require('../../helpers/database/error.js/CustomError');
const expressAsyncHandler = require('express-async-handler');


const checkUserList=expressAsyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    if(!user){
        return next(new CustomError("token expired",404));
        
    }
    next();
});

module.exports={
    checkUserList
}
