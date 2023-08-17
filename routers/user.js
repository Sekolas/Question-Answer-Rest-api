const express=require("express");
const {getSingleUser,getAllUsers} = require('../controllers/user');
const checkUserList = require('../middlewares/database/databaseErrorHelpers');



const router =express.Router();


router.get("/:id",checkUserList,getSingleUser);
router.get("/",getAllUsers);



