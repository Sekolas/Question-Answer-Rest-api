const mongoose=require("mongoose");
const { string } = require("simple-is");
const { findById } = require("./question");
const question = require("./question");

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

answerSchema.pre("save",async function(next){
    if(!this.isModified("user")){
        return next();
    }
    try {
        const quesiton=await question.findById(this.question);
        quesiton.answers.push(this._id);
        await quesiton.save();
    } catch (error) {
        return next(error);
        
    }


})

module.exports=mongoose.model("Answer",answerSchema);