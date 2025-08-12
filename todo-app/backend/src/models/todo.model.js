import mongoose from "mongoose";

//modelling
let todoSchema = new mongoose.Schema({
  task: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

let Todo = mongoose.model("Task", todoSchema);

export default Todo;