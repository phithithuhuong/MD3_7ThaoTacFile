const http = require('http');
const  fs=  require('fs');
const qs = require('qs')
http.createServer((req, res) => {
    if(req.method==='GET'){
        fs.readFile('./templates/create.html', 'utf8',(err, data) => {
            if (err){
                console.log(err.message)
            }
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data);
            res.end()
        })
    }else {
        let data= '';
        req.on('data', chunk => {
            data+=chunk
        })
        req.on('end', ()=>{

            let name=  qs.parse(data).name
            console.log(name)
            fs.writeFile('./data/data.txt', name, 'utf8',err => {
                if (err){
                    console.log(err)
                }
                return res.end('Create success')
            })
        })
        req.on('error', () => {
            console.log('error')
        })

    }

}).listen(4000,()=>{
    console.log('http://localhost:4000')
})