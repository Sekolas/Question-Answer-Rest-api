class CustomError extends Error{
    constructor(messages,status){
        super(messages);
        this.status=status;
    }
}
module.exports={
    CustomError
}