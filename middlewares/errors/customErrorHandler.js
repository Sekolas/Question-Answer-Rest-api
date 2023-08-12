const CustomError = require("../../helpers/database/error.js/CustomError");


const CustomErrorHandler=(err,req,res,next)=>{

    let customError =err;

    
    res
    .status(CustomError.status || 500)
    .json({
        success:false,
        message:CustomError.message

    })
};

module.exports=CustomErrorHandler;