import express from "express";
import todoRoutes from './routes/todo.routes.js'
import cors from 'cors';
import db from "./db/index.js";
db()
let app = express();




//middleware stack
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());
//routes--base path
app.use("/todos",todoRoutes)


export default app;
