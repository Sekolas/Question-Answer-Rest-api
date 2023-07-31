const CustomErrorHandler=(err,req,res,next)=>{

    let CustomError =err;
    console.log(CustomError.message,CustomError.status);

    console.log("custom error handlerr");
    res
    .status(CustomError.status || 500)
    .json({
        success:false,
        message:CustomError.message ||"Internel server error"

    })
};

module.exports=CustomErrorHandler;