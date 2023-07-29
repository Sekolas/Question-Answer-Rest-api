const mongoose=require("mongoose");
const { string } = require("simple-is");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"please peovide a name"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"please try different e mail"],
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
    }
    
    
});


module.exports=mongoose.model("user",userSchema);