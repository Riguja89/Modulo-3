var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]



http.createServer( function(req, res){ 

  //console.log(beatles[0].name);

  if( req.url === '/api'){
	res.writeHead(200, { 'Content-Type':'application/json' }) //Vamos a devolver texto en formato JSON
	res.end( JSON.stringify(beatles) ); //Antes de enviar el objeto, debemos parsearlo y transformarlo a un string JSON
  }else if(req.url.split('/')[1]=='api'&&beatles.find(e=>{return e.name===req.url.split('/')[2].split('%20').join(' ')})!=undefined){
   
    res.writeHead(200, { 'Content-Type':'application/json' }) //Vamos a devolver texto en formato JSON
    res.end( JSON.stringify(beatles.find(e=>{return e.name===req.url.split('/')[2].split('%20').join(' ')})) ); 
  }else if( req.url === '/'){ //Si la URL es / devolvemos el HTML

		res.writeHead(200, { 'Content-Type':'text/html' })
		var html = fs.readFileSync(__dirname +'/index.html');
		res.end(html);
  }else if( beatles.find(e=>{return e.name===req.url.split('/')[1].split('%20').join(' ')})){ //Si la URL es / devolvemos el HTML
    let beatle = beatles.find(e=>{return e.name===req.url.split('/')[1].split('%20').join(' ')});
		res.writeHead(200, { 'Content-Type':'text/html' })
		var html = fs.readFileSync(__dirname +'/beatle.html','utf8');
    var nombre = beatle.name; //Esta es la variable con la que vamos a reemplazar el template
    var birthdate = beatle.birthdate; //Esta es la variable con la que vamos a reemplazar el template
    var profilePic=beatle.profilePic;
	  html = html.replace('{nombre}', nombre); // Usamos el método replace es del objeto String
    html = html.replace('{birthdate}', birthdate); 
    html = html.replace('{urlimage}', profilePic); 
		res.end(html);
  }


  else{res.end('no encontrado')}

}).listen(1337, '127.0.0.1');