const multer=require("multer");
const path=require("path");
const { CustomError } = require('../../helpers/database/error.js/CustomError');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const rootDir=path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"))
    },
    filename:function(req,file,cb){
        const extension=file.mimetype.split("/")[1];
        req.savedProfileImage="ımage"+req.user.id+"."+extension;
        cb(null,req.savedProfileImage);
    }
});

const filefiter=(req,file,cb)=>{
    let allowedtpes=["image/jpg","image/gif","image/jpeg","image/png"]
    if(!allowedtpes.includes(file.mimetype)){
        return cb(new CustomError("please provide a valid image",400),false);
    }
    return cb(null,true);
};

const profileimageupload=multer({storage,filefiter});

module.exports={
    profileimageupload
}