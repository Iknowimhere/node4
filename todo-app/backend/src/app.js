import express from "express";
import mongoose from "mongoose";
let app = express();
//db connection
async function db() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskDB");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}
db();

//modelling
let todoSchema = new mongoose.Schema({
  task: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

let Todo = mongoose.model("Task", todoSchema);

//middleware stack
app.use(express.json());

//get all todos
app.get("/todos", async (req, res, next) => {
  let todos = await Todo.find();
  if (!todos.length) {
    res.status(200).json({ message: "No pending todos" });
    return;
  }
  res.status(200).json(todos);
});

//create a todo
app.post("/todos", async (req, res, next) => {
  if (!req.body || !req.body.task) {
    res.status(200).json({ message: "task is required" });
    return;
  }
  let newTodo = await Todo.create({
    task: req.body.task,
  });
  res.status(201).json(newTodo);
});

//find a single todo based on id
app.get("/todos/:id", async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(200).json({ message: "no todo with that id found!" });
    return;
  }
  res.status(200).json(todo);
});

//udpate a task by id
app.put("/todos/:id",async(req,res,next)=>{
    let updatedTodo=await Todo.findByIdAndUpdate(req.params.id,{task:req.body.task},{new:true})
    res.status(200).json(updatedTodo)
})

//update status by id
app.put("/todos/status/:id",async(req,res,next)=>{
    let updatedTodo=await Todo.findByIdAndUpdate(req.params.id,{completed:req.body.completed},{new:true})
    res.status(200).json(updatedTodo)
})

//delete by id
app.delete("/todos/:id",async(req,res,next)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Deleted successfully"})
})




export default app;
