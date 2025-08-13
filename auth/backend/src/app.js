import express from 'express'
import dbConnect from './db/index.js';
import authRoutes from './routes/auth.routes.js'
dbConnect()
let app=express()

//routes
app.use("/api/v1/auth",authRoutes);


export default app;