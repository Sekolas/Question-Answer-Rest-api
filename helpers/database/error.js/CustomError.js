class CustomError extends Error{
    constructor(messages,status){
        this.status=status;
        super(messages);

    }

}
module.exports=CustomError;