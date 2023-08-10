const CustomError = require('../../../helpers/database/error.js/CustomError');
const js = require('jsonwebtoken');
const { istokenİncluded,getAccesTokenFromHeader} = require('../../../helpers/authorization/tokenHelpers');




const getAccesToRoute=(req,res,next)=>{

    if(!istokenİncluded(req)){
        return next(new CustomError("you are not auth to acces",401));
    }

    const acces_token=getAccesToRoute(req);
    const JWT_SECRET_KEY="nothingelsematters";
    js.verify(acces_token,JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(new CustomError("you are not auth to acces",401));
        }
        console.log(decoded);
        next();

    });

    

}

module.exports={
    getAccesToRoute
};