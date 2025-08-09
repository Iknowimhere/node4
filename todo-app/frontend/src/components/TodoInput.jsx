
import axios from '../axios'

const TodoInput = ({task,setTask,setTodos,loading,setLoading}) => {
    

    const handleChange=(e)=>{
        let {value}=e.target
        setTask(value)
    }
    const handleSubmit=async (e)=>{
        setLoading(true)
       try {
         e.preventDefault()
        let res=await axios.post("/",{task})
        setTodos((prev)=>{
            return [...prev,res.data]
        })
        setLoading(false)
        setTask("")
       } catch (error) {
        console.log(error);
        setLoading(false)
       }
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="" id="" placeholder="create a todo" onChange={handleChange} value={task}/>
            <button type="submit">{loading?"Creating...":"Create"}</button>
        </form>
    </div>
  )
}
export default TodoInput