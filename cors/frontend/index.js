fetch("http://localhost:5000").then((res)=>{
    return res.json()
}).then((data)=>{
    let div=document.querySelector("div")
    console.log(data);
    let output="";
    data.forEach(emp => {
        output+=emp.name
    });
    div.innerText=output
})