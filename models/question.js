const mongoose=require("mongoose");
const { string } = require("simple-is");
const slugify = require('slugify');

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
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
        }
    ]

});

QuestionSchema.pre("save",function(next){
    if(!this.isModified("title")){
        next();
    }
    this.slug=this.makeSlug();
    next();



});


QuestionSchema.methods.makeSlug=function(){
    slugify(this.title, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
    })
}


module.exports=mongoose.model("Question",QuestionSchema);