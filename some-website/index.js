import http from "http";
import fs from "fs";
import {parse} from 'querystring'
import {MongoClient} from 'mongodb'

//request handler function
let server = http.createServer((req, res) => {
if(req.method==="POST"){
  if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
    //events 
    let data=""
    req.on("data",(chunk)=>{
      data+=chunk;
    })
    req.on("end",async ()=>{
      let obj=parse(data)
      let client=new MongoClient("mongodb://127.0.0.1:27017")
      let conn=await client.connect()
      let db=await conn.db("userInfoDB")
      let coll=await db.collection("users")
      await coll.insertOne(obj)
      res.end("<h1 style='text-align:center;margin-top:5em;'>Thank you for contacting us!!</h1>")
    })
  }else{
    res.end("Didnt get form data")
  }
}else{
  if (req.url === "/") {
    let html = fs.readFileSync("./index.html");
    res.writeHead(200, "Ok", { "content-type": "text/html" });
    res.end(html.toString());

  } else if (req.url === "/about") {
    let aboutHtml = fs.readFileSync("./about.html");
    res.writeHead(200, "Ok", { "content-type": "text/html" });
    res.end(aboutHtml.toString());

  }else if(req.url==="/style"){
    let css=fs.readFileSync("./style.css")
    res.writeHead(200,"Ok",{"content-type":"text/css"})
    res.end(css)

  }else if(req.url==="/image"){
    let image=fs.readFileSync("./image.jpg")
    res.writeHead(200,"Ok",{"content-type":"image/jpg"})
    res.end(image)
    
  }else if(req.url==="/contact"){
    let html=fs.readFileSync("./contact.html")
    res.writeHead(200,"Ok",{"content-type":"text/html"})
    res.end(html.toString())
  }
  else {
    res.writeHead(404, "Not found", { "content-type": "text/plain" });
    res.end("Page not found!!");
  }
}
});

server.listen(5000, () => {
  console.log("Server is on port 5000");
});
