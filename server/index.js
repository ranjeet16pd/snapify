// import  express  from 'express';
import  express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';




dotenv.config();

const app=express();
import bodyParser from "body-parser";
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));



app.use(cors());

app.use(express.json())

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.use(express.json({limit :'50mb'}));

app.get('/',async(req,res)=>{
    res.send("Hello from DaLL-E!");
})

// 0rfu2JMYoWKQmR4B
const startServer=async ()=>{
       
    try{
        
      connectDB(process.env.MONGODB_URL);
      app.listen(8080,()=>console.log('server has started on port http://localhost:8080'));
    
    } catch(error){
   console.log(error);
    }
}

startServer();