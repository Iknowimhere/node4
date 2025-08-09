import { useEffect, useState } from "react";
import axios from "../axios";

const TodoList = ({todos,setTodos,setLoading,loading,setError,error}) => {

  const fetchTodos = async () => {
    setLoading(true)
    try {
      let res = await axios.get("/");
      setTodos(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      if(error.status===500){
        setError("Internal server error")
      }
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if(error){
    return <p style={{color:"red"}}>{error}</p>
  }

  const handleToggle = async (todo) => {
    try {
      let res = await axios.put(`/status/${todo._id}`, { completed: !todo.completed });
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.log(error);
    }
  }  
  return (
    <ul>
      {loading?(<p>Loading...</p>):(<>{todos.map((todo) => {
        return (
          <li key={todo._id}>
            <span>{todo.task}</span>---
            <span>{todo.completed ? "Done!!" : "Not done!!"}</span>
            <button onClick={()=>handleToggle(todo)}>Toggle status</button>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        );
      })}</>)}
    </ul>
  );
};
export default TodoList;
