const mongoose=require("mongoose");
const { string } = require("simple-is");

const Schema=mongoose.Schema;


const QuestionSchema=new Schema({
    title:{
        type:String,
        required:[true,"please provide a title"],
        minlength:[10,"please provide a title at least 10 charcters"],
        unique:true
    },
    content:{
        type:String,
        required:[true,"please provide a content"],
        minlength:[10,"please provide a title at least 20 charcters"],
    },
    slug:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    user:{
        type:mongooses.Schema.ObjectId,
        required:true,
        ref:"User"
    }

});


module.exports=mongoose.model("Question",QuestionSchema);