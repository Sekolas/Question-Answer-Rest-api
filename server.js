const express=require("express");
const dotenv=require("dotenv");
const app=express();
const connectdb=require("./helpers/database/connectdatabase");
const routers=require("./routers/index.js");
const CustomErrorHandler=require("./middlewares/errors/customErrorHandler");
const path=require("path");


dotenv.config({
    path:"./config/env/config.env",
});


connectdb();

const PORT=process.env.PORT;

app.use(express.json());
app.use("/api",routers);
app.use(CustomErrorHandler);
app.use(express.static(path.join(__dirname,"public")));
app.listen(PORT,()=>{
    console.log('port aktif '+process.env.NODE_ENV+process.env.PORT);
});
