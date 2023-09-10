const mongoose=require("mongoose");
const { string } = require("simple-is");

const Schema=mongoose.Schema;

const answerSchema=new Schema({
    content:{
        type:String,
        required:[true,"please provide a content"],
        minlength:[10,"please  provide a content at least 10 charcters"],

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    likes :[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref:"question",
        required:true,
    }

})

module.exports=mongoose.model("Answer",answerSchema);