import { useAuth } from "../context/Auth"

const Home = () => {
let {user,token,logout}=useAuth()
console.log(user);
console.log(token);


  return (
    <div>Welcome {user?.username}
    <button onClick={logout}>Logout</button>
    </div>
  )
}
export default Home