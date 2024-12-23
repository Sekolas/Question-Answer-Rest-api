const customErrorHandler = require('../middlewares/errors/customErrorHandler');
const expressAsyncHandler = require('express-async-handler');
const  User  = require('../models/user');
const { CustomError } = require('../helpers/database/error.js/CustomError');



const getSingleUser=expressAsyncHandler(async (req, res, next) => {
    const {id} =req.params.id;

    const user=await User.findById(id);

    if(!user){
        return next(new CustomError("there is no user with that id",400));
    }

    return res.status(200)
    .json({
        success:true,
        data:user
    })


});

const getAllUsers=expressAsyncHandler(async (req, res, next) => {
    const users=await User.find();
    return res.status(200)
    .json({
        success:true,
        data:users
    })
})


module.exports={
    getSingleUser,
    getAllUsers
}