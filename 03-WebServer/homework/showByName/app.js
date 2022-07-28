var fs  = require("fs")
var http  = require("http")
var Promise = require('bluebird'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
	promisifiedReadFile = exerciseUtils.promisifiedReadFile;

// Escribí acá tu servidor
http.createServer( function(req, res){


		
	promisifiedReadFile(__dirname+'/images/arcoiris_doge.jpg')
	.then(function successHandler1(result) {
	  // Usa el valor adentro del callback

		res.writeHead(200, { 'Content-Type':'image/jpg' })
		res.end(result);
		console.log(typeof(result));
	})
	.catch(e=>{console.log(e)
	res.end(toString( e));}
	)



	//console.log(req.url);

		// fs.readFile(__dirname +'/images'+req.url+'.jpg',null,function(err,data){
		// 	if(err){
		// 	res.writeHead(404, { 'Content-Type': 'text/plain' });
  		// 	res.end('Error: La imagen solicitada no existe ');
		// 	  console.log(err);
		// 	}
		// else
		// //console.log(data);
		// res.writeHead(200, { 'Content-Type':'image/png' })
		// res.end(data);
		// });

}).listen(1337, '127.0.0.1');