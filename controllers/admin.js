const User = require("../models/user");
const CustomError = require("../helpers/database/error.js/CustomError");
const asyncError = require("express-async-handler");

const BlockUser=asyncError(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);

    user.blocked=!user.blocked;
    await user.save();

    return res.status(200)
    .json({
        success:true,
        message:"Block-Unblock succesful"
    })

    
});

const deleteuser=asyncError(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    await user.remove();

    return res.status(200)
    .json({
        success:true,
        message:"deleted"
    })
})


module.exports={
    BlockUser,
    deleteuser
}