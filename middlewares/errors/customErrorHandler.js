const CustomError = require("../../helpers/database/error.js/CustomError");


const CustomErrorHandler=(err,req,res,next)=>{

    let customError =err;

    console.log("custom error handlerr");
    res
    .status(CustomError.status || 500)
    .json({
        success:false,
        message:CustomError.message ||"Internel server error"

    })
};

module.exports=CustomErrorHandler;