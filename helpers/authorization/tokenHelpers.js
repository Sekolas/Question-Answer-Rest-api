
const jwt=require("jsonwebtoken");

const SendJwt=(user,res)=>{
    const token=user.generateJwtFromUser();
    const JWT_COOKIE=10;
    return res
    .status(200)
    .cookie("acces_token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+JWT_COOKIE*1000),
        secure:true
    })
    .json({
        succees:true,
        acces_token:token,
        data:{
            name:user.name,
            email:user.email
        }
    });

};

const istokenİncluded=(req)=>{
    if(req.headers.authorization){
        return true;
    }
    else{
        return false;
    }
}
const getAccesTokenFromHeader=(req)=>{
    const authorization= req.headers.authorization;
    const acces_token=authorization.split(" ")[1];
    return acces_token;
}

module.exports={
    SendJwt,
    istokenİncluded,
    getAccesTokenFromHeader
};