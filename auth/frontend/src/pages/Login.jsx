import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";
const Login = () => {
        let {setUser,setToken}=useAuth()
  let [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let res = await axios.post("http://localhost:3000/api/v1/auth/login", {
      ...form,
    });
    let { username, email, token } = res.data;
    setUser({ username, email });
    setToken(token);
    } catch (error) {
        console.log(error);
    }
  };
  return (
    <div>
      <h1>Welcome {name}</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
