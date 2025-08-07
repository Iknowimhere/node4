import http from 'http'

let server=http.createServer((req,res)=>{
    let employees=[
        {
            name:"tony",
            salary:20000
        },
        {
            name:"clark",
            salary:30000
        }
    ]
    // http://127.0.0.1:5500/cors/frontend/index.html
    res.writeHead(200,"Ok",{
        "content-type":"application/json",
        "access-control-allow-origin":"http://127.0.0.1:5500"
    })
    res.end(JSON.stringify(employees))
})

server.listen(5000,()=>{
    console.log("Server is on 5000");
})

