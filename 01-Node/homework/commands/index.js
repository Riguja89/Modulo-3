var fs=require('fs');
const request = require('request');

module.exports = {

    pwd: function(){
        process.stdout.write(process.cwd())
    },
    date: function(){
        process.stdout.write(Date())
    },
    ls: function(){
        fs.readdir('.','utf-8',function(err, files){ // array con t¿los nombres de los archivos
            if(err) throw err;
            files.forEach(file=>{
            process.stdout.write(file + '\n')
           
            })  
            process.stdout.write('\n prompt > ');  
        })
    },
    echo: function(args){
        process.stdout.write(args.join(' ')); //vuelva y une los items de array separados por un espacio
    },
    cat:function(args){
        fs.readFile(args[0],'utf-8',function(err, file){
            if(err) throw err;
            process.stdout.write(file); 
            process.stdout.write('\n prompt > ');  
        })
    },
    head:function(args){
        fs.readFile(args[0],'utf-8',function(err, file){
        if(err) throw err;
          const lines= file.split('\n').slice(0,3);
            process.stdout.write(lines.join('\n')); 
            process.stdout.write('\n prompt > ');  
        })
    },
    tail:function(args){
        fs.readFile(args[0],'utf-8',function(err, file){
            if(err) throw err;
              const lines= file.split('\n').slice(-3);
                process.stdout.write(lines.join('\n')); 
                process.stdout.write('\n prompt > ');  
            })
    },
    curl:function(args){

        request(args[0], function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            process.stdout.write(body);
            process.stdout.write('\n prompt > ');
          });

    }

}