import { useEffect, useState } from "react";
import axios from "../axios";

const TodoList = ({
  todos,
  setTodos,
  setLoading,
  loading,
  setError,
  error,
}) => {
  let [editId,setEditId]=useState(null)
  let [editTask,setEditTask]=useState("")

  const fetchTodos = async () => {
    setLoading(true);
    try {
      let res = await axios.get("/");
      setTodos(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.status === 500) {
        setError("Internal server error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const handleToggle = async (todo) => {
    try {
      let res = await axios.put(`/status/${todo._id}`, {
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === todo._id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete=async (id)=>{
      await axios.delete(`/${id}`);
      setTodos((prevTodos)=>prevTodos.filter(t=>t._id!==id))
  }

  const handleEdit=(todo)=>{
    setEditId(todo._id)
    setEditTask(todo.task)
  }


  const handleUpdate=async()=>{
    let res=await axios.put(`/${editId}`,{task:editTask})
     setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === editId ? { ...t, task:editTask } : t
        )
      );
    setEditId(null)
  }
  return (
    <ul>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {todos.length>0 && todos.map((todo) => {
            return (
              <li key={todo._id}>
               {editId===todo._id?(<>
                <input type="text" name="task" value={editTask} onChange={(e)=>setEditTask(e.target.value)}/>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={()=>setEditId(null)}>Cancel</button>
               </>):(<>
                <span>{todo.task}</span>---
                <span>{todo.completed ? "Done!!" : "Not done!!"}</span>
                <button onClick={() => handleToggle(todo)}>
                  Toggle status
                </button>
                <button onClick={()=>handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
               </>)}
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
};
export default TodoList;
