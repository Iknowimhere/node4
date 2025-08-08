
import axios from '../axios'

const TodoInput = ({task,setTask}) => {
    

    const handleChange=(e)=>{
        let {value}=e.target
        setTask(value)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        let res=await axios.post("/",{task})
        setTask("")
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="" id="" placeholder="create a todo" onChange={handleChange} value={task}/>
            <button type="submit">Create</button>
        </form>
    </div>
  )
}
export default TodoInput