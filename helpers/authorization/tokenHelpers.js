
const jwt=require("jsonwebtoken");

const SendJwt=(user,res)=>{
    const token=user.generateJwtFromUser();
    const JWT_COOKIE=10;
    return res
    .status(200)
    .cookie("acces_token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+JWT_COOKIE*1000),
        secure:false
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

module.exports=SendJwt;