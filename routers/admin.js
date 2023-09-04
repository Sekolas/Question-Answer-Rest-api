const express=require("express");
const {getAccesToRoute,getAdminAccess}=require("../middlewares/errors/authorization/auth");
const {BlockUser,deleteuser} = require('../controllers/admin');
const { checkUserList } = require("../middlewares/database/databaseErrorHelpers");
const router=express.Router();
router.use([getAccesToRoute,getAdminAccess]);

router.get("/block/:id",checkUserList,BlockUser);
router.delete("/user/:id",checkUserList,BlockUser,deleteuser);
module.exports=router;