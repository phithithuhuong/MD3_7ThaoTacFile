const http=  require('http');
const fs=  require('fs');
const qs = require('qs');
let dataFile ='';
let html= '';

http.createServer((req, res) =>{
    fs.readFile('data.json','utf8',(err, data) => {
        if(err){
            console.log(err)
        }
        dataFile = JSON.parse(data);
        console.log(dataFile)// đưa string sang object
       dataFile.forEach((  value) => {
            html+=`  <tr>`
            html+=`  <th scope="row">${value.id}</th>`
            html+=`  <td>${value.name}</td>`
            html+=`  <td>${value.price}</td>`
            html+=`  <td><button type="button" class="btn btn-success">Edit</button></td>`
            html+=`  <td><button type="button" class="btn btn-success">Delete</button></td>`
            html+=`  </tr>`
        })

    })
    fs.readFile('./view/product.html','utf8',(err, data) => {
        if (err){
            console.log(err)
        }
        data= data.replace('{product}', html)
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data)
        res.end()
    })
} ).listen(1000,()=>{
    console.log('http://localhost:1000')
})