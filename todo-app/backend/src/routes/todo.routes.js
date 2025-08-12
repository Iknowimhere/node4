import express from "express";
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  updateStatus,
  updateTask,
} from "../controllers/todo.controllers.js";
//router instance
let router = express.Router();

//get all todos
router.get("/", getTodos);

//create a todo
router.post("/", postTodo);

//find a single todo based on id
router.get("/:id", getTodo);

//udpate a task by id
router.put("/:id", updateTask);

//update status by id
router.put("/status/:id", updateStatus);

//delete by id
router.delete("/:id", deleteTodo);

export default router;
