import { useEffect, useState } from "react";
import axios from "../axios";
import { useCallback } from "react";

const TodoList = ({
  todos,
  setTodos,
  setLoading,
  loading,
  setError,
  error,
}) => {
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/");
      setTodos(res.data);
    } catch (error) {
      console.log(error);
      if (error.status === 500) {
        setError("Internal server error");
      }
    } finally {
      setLoading(false);
    }
  }, [setLoading, setTodos, setError]);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const handleToggle = useCallback(async (todo) => {
    try {
      await axios.put(`/status/${todo._id}`, {
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
  }, [setTodos]);

  const handleDelete = useCallback(async (id) => {
    try {
      await axios.delete(`/${id}`);
      setTodos((prevTodos) => prevTodos.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);
    }
  }, [setTodos]);

  const handleEdit = useCallback((todo) => {
    setEditId(todo._id);
    setEditTask(todo.task);
  }, []);


  const handleUpdate = useCallback(async () => {
    try {
      await axios.put(`/${editId}`, { task: editTask });
      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t._id === editId ? { ...t, task: editTask } : t
        )
      );
      setEditId(null);
    } catch (error) {
      console.log(error);
    }
  }, [editId, editTask, setTodos]);
  return (
    <ul>
      {loading ? (
        <p>Loading...</p>
      ) : todos.length > 0 ? (
        todos.map((todo) => (
          <li key={todo._id}>
            {editId === todo._id ? (
              <>
                <input
                  type="text"
                  name="task"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  autoFocus
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.task}</span>---
                <span>{todo.completed ? "Done!!" : "Not done!!"}</span>
                <button onClick={() => handleToggle(todo)}>
                  Toggle status
                </button>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </ul>
  );
}


export default TodoList