import { useState } from "react"
import axios from "axios"

const Login = () => {
    let [form,setForm]=useState({
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        let {name,value}=e.target
        setForm({...form,[name]:value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
       let res= await axios.post("http://localhost:3000/api/v1/auth/login",{...form})
       console.log(res.data);
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="email" name="email" id="email" placeholder="enter email" onChange={handleChange} value={form.email}/>
            <input type="password" name="password" id="password" placeholder="enter password" onChange={handleChange} value={form.password}/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}
export default Login