import express from 'express'
//app instance--top level express function call
let app=express();
//middleware based routing framework

app.use(function(req,res,next){
    console.log("parse");
    next()
},function(req,res,next){
    console.log("auth");
    next()
})


app.get("/home",(req,res,next)=>{
    res.send("home page")
})

app.get("/about",(req,res,next)=>{
    res.send("about page")
})

export default app;


