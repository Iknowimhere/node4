import express from 'express'
import dbConnect from './db/index.js';
import authRoutes from './routes/auth.routes.js'
import cors from 'cors'
dbConnect()
let app=express()

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use("/api/v1/auth",authRoutes);


export default app;