const http = require('http');
const fs = require('fs');
const qs=  require('qs');
http.createServer((req, res) => {
    console.log('ok')
    if (req.method==='GET'){
        fs.readFile('./view/update.html','utf8', (err, data) => {
            res.writeHead(200,{'Content':'text/html'});
            res.write(data)
            res.end()
        })
    }else {
        let data= '';
        req.on("data", chunk => {
            data+=chunk;
        })
        console.log(data)
        req.on('end',()=>{
            let product= qs.parse(data);
            JSON.stringify(product);//
            console.log(product)
            if (data.idProduct===product.id){
                data.id= product.id
                data.name= product.name
                data.price= product.price
            }
            fs.writeFile('./data.json',product,(err)=>{
                if (err){
                    console.log(err)
                }
                return res.end('ok')
            })

        })
        req.on('error', () => {
            console.log('error')
        })
    }

}).listen(3030,()=>{
    console.log('http://localhost:3030')
})