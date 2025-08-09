import { useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

const App = () => {
  let [task,setTask]=useState("")
    let [todos, setTodos] = useState([]);
    let [loading,setLoading]=useState(false);
    let [error,setError]=useState("")
  return (
    <>
    <TodoInput task={task} setTask={setTask} setTodos={setTodos} loading={loading} setLoading={setLoading}/>
    <TodoList todos={todos} setTodos={setTodos} loading={loading} setLoading={setLoading} error={error} setError={setError}/>
    </>
  )
}
export default App