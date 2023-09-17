const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const { string } = require("simple-is");
const crypto=require("crypto");
const { constants } = require("buffer");
const Question = require('./question');



const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"please peovide a name"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "please provde a valid e mail"
        ]
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minlength:[6,"please provide a password with min length 6"],
        required:[true,"please provide a password"],
        select:false
    },
    created_At:{
        type:Date,
        default:Date.now,
    },
    title:{
        type:String
    },
    about:{
        type:String
    },
    place:{
        type:String
        
    },
    website:{
        type:String
        
    },
    profile_img:{
        type:String,
        default:"default.jpeg"
    },
    blocked:{
        type:Boolean,
        default:false
    },
    resetPassword:{
        type:String,
    },
    resetpasswordExpıre:{
        typ:Date

    }
    
});

userSchema.methods.getresetPasswordTokenUser=()=>{
    const {RESET_PASSWORD_EXPIRE}=process.env;
    const ramdomHexString=crypto.randomBytes(15).toString("hex");
    const resettoken=crypto.createHash("SHA256").update(ramdomHexString).digest("hex");
    console.log(resettoken);
    this.resetPassword=resettoken;
    this.resetpasswordExpıre=Date.now()+parseInt( RESET_PASSWORD_EXPIRE);
    return resettoken;

};



userSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload={
        id:this._id,
        name:this.name
    };
    const token = jwt.sign(payload , JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE,
    });

    return token;

};


userSchema.methods.getResetPasswordFromUser=function(){
    const {RESET_PASSWORD_EXPIRE}=process.env;

    const ramdomHexStrinf=crypto.randomBytes(15).toString("hex");
    const resetpasswrodToken=crypto
    .createHash("SHA256")
    .update(ramdomHexStrinf)
    .digest("hex");

    console.log(resetpasswrodToken);

    this.resetPassword=resetpasswrodToken;
    this.resetpasswordExpıre=Date.now()+parseInt(RESET_PASSWORD_EXPIRE);

    

}


userSchema.pre("save",function(next){

    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt)=> {
    if(err) next(err);

        bcrypt.hash(this.password, salt, (err, hash)=> {
    
            if(err) next(err);
            this.password=hash;
            next();

        });
    });
});
userSchema.post("remove",async function(){
    await Question.deleteMany({
        user:this._id
    });


});


module.exports=mongoose.model("user",userSchema);