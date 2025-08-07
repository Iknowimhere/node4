import http from 'http'
import app from './app.js';

let server=http.createServer(app);

server.listen(5000,()=>{
    console.log("Server is on 5000...");
})