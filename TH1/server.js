const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    let dataFile=  '';
    let  html = '';
    fs.readFile('./data/data.text','utf8', (err, data) => {

        if (err){
            console.log( err)
        }
        dataFile=  data.split(",");
        dataFile.forEach((value, index) => {
            html += '<tr>'
            html += `<td>${index + 1}</td>`
            html += `<td>${value}</td>`
            html += `<td><button class="btn btn-danger">Delete</button></td>`
            html += '</tr>';
        })


    });

    fs.readFile('./templates/index.html', 'utf8', (err, dataHtml)=>{
        if (err){
            console.log( err)
        }

        dataHtml = dataHtml.replace( '{list-user}', html)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(dataHtml)
      return  res.end()
    });

}).listen(4200,()=>{
    console.log('http://localhost:4200')
})