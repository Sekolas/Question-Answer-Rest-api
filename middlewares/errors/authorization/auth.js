const CustomError = require('../../../helpers/database/error.js/CustomError');
const js = require('jsonwebtoken');
const { istokenİncluded,getAccesTokenFromHeader} = require('../../../helpers/authorization/tokenHelpers');

const getAccesToRoute=(req,res,next)=>{
    const {JWT_SECRET_KEY}=process.env;
    if(!istokenİncluded(req)){
        return next(new CustomError('you are not auth to acces',401));
        
    }
    const accestoken=getAccesTokenFromHeader(req);

    js.verify(accestoken,JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return next(new CustomError('you are not auth to acces',401));
        }
        req.user={
            id:decoded.id,
            name:decoded.name
        }
        next();
    });
};

module.exports={
    getAccesToRoute
};