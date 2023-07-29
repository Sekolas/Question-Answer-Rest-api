const CustomErrorHandler=(err,req,res,next)=>{
    console.log("custom error handlerr");
    res
    .status(400)
    .json({
        success:false,

    })
};

module.exports=CustomErrorHandler;