import express from "express"
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js";
import {clerkMiddleware} from "@clerk/express"

const app=express();
const port=3000;


await connectDB();
//Middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//API routes
app.get("/",(req,res)=>{
    res.send("server is live gsiroljbh;n3r!")})

    app.use('/api/ingest',serve({ client: inngest, functions }))
    app.listen(port,()=>{
        console.log(`server is listening at http://localhost:${port}`)
    })