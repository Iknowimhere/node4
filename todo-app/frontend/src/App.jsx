import { useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

const App = () => {
  let [task,setTask]=useState("")
  return (
    <>
    <TodoInput task={task} setTask={setTask}/>
    <TodoList task={task}/>
    </>
  )
}
export default App