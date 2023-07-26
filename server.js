const express=require("express");
const dotenv=require("dotenv");
const app=express();
const connectdb=require("./helpers/database/connectdatabase");
const routers=require("./routers/index.js");


dotenv.config({
    path:"./config/env/config.env",
});


connectdb();

const PORT=process.env.PORT;


app.use("/api",routers);

app.listen(PORT,()=>{
    console.log('port aktif '+process.env.NODE_ENV);
});
