const express = require("express")
const app = express()

require("dotenv/config")

const cors = require("cors")
const {default : mongoose, Mongoose} = require("mongoose");


// app.use(cors({origin : true}));


app.get("/",(req,res)=>{
    return res.json("Hii Baby....")
})

mongoose.connect(process.env.DB_STRING,{
    useNewUrlParser : true
})
mongoose.connection
.once("open",()=>{
    console.log("MongoDB is connected");
})
.on("error",(error)=>{
    console.log(`ERROR : ${error}`);
})


app.listen(4000,()=>{
    console.log("Listening to port 4000")
})