import { useState } from "react"
import axios from "axios"

const Signup = () => {
    let [form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange=(e)=>{
        let {name,value}=e.target
        setForm({...form,[name]:value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
       let res= await axios.post("http://localhost:3000/api/v1/auth/register",{...form})
       console.log(res.data);
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" placeholder="enter username" onChange={handleChange} value={form.username}/>
            <input type="email" name="email" id="email" placeholder="enter email" onChange={handleChange} value={form.email}/>
            <input type="password" name="password" id="password" placeholder="enter password" onChange={handleChange} value={form.password}/>
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm your password" onChange={handleChange} value={form.confirmPassword}/>
            <button type="submit">Signup</button>
        </form>
    </div>
  )
}
export default Signup