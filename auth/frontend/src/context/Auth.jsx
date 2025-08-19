import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

let AuthContext = createContext();

let AuthProvider = ({ children }) => {
    let [user,setUser]=useState(()=>{
        let user=localStorage.getItem("user")|| null
        let res=user!==null?JSON.parse(user):null
        return res
    })
    let [token,setToken]=useState(()=>{
        return localStorage.getItem("token")|| null
    })

    useEffect(()=>{
        if(user){
            localStorage.setItem("user",JSON.stringify(user))
        }
        if(token){
            localStorage.setItem("token",token)
        }
    },[user,token])

    let logout=()=>{
        if(user){
            localStorage.removeItem("user")
        }
        if(token){
            localStorage.removeItem("token")
        }
    }
  return (
    <AuthContext.Provider value={{user,token,setUser,setToken,logout}}>{children}</AuthContext.Provider>
  );
};

export let useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
