const http=require('http');
const fs = require('fs');
const qs = require('qs');
http.createServer((req, res) => {
    console.log(1)
    if (req.method==='GET'){
        fs.readFile('./view/product.html','utf8',(err, productHtml)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(productHtml);
            res.end();
        })
    }else {
        let products=[]
        let data= '';
        req.on("data", chunk => {
            data+=chunk;
        })
        req.on('end',()=>{
            let product= qs.parse(data);
            products=JSON.stringify(product);//
            console.log(product)
            fs.writeFile('./file.json',products,(err)=>{
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

}).listen(9000,()=>{
    console.log( 'http://localhost:9000');
})