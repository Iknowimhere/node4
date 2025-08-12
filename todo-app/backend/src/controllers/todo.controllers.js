import Todo from "../models/todo.model.js";

export let getTodos=async (req, res, next) => {
  let todos = await Todo.find();
  if (!todos.length) {
    res.status(200).json({ message: "No pending todos" });
    return;
  }
  res.status(200).json(todos);
}

export let postTodo=async (req, res, next) => {
  if (!req.body || !req.body.task) {
    res.status(200).json({ message: "task is required" });
    return;
  }
  let newTodo = await Todo.create({
    task: req.body.task,
  });
  res.status(201).json(newTodo);
}

export let getTodo=async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(200).json({ message: "no todo with that id found!" });
    return;
  }
  res.status(200).json(todo);
}

export let updateTask=async (req, res, next) => {
  let updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { task: req.body.task },
    { new: true }
  );
  res.status(200).json(updatedTodo);
}

export let updateStatus=async (req, res, next) => {
  let updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.status(200).json(updatedTodo);
}

export let deleteTodo=async (req, res, next) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Deleted successfully" });
}