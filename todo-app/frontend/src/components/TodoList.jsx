import { useEffect, useState } from "react";
import axios from "../axios";

const TodoList = ({task}) => {
  let [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    try {
      let res = await axios.get("/");
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [task]);

  const handleToggle=async (todo)=>{
    try {
        let res=await axios.put(`/status/${todo._id}`,{completed:!todo.completed})
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo._id}>
            <span>{todo.task}</span>---
            <span>{todo.completed ? "Done!!" : "Not done!!"}</span>
            <button onClick={()=>handleToggle(todo)}>Toggle status</button>
          </li>
        );
      })}
    </ul>
  );
};
export default TodoList;
