// const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());
server.use(cors());
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(express.json())

// TODO: your code to handle requests

server.post('/posts', cors(corsOptions),(req, res, next)=>{ //Ruta para un GET a /
    let id=posts.length
     let user=req.body;
   if(user.title && user.contents && user.author){
        user.id=id;
        posts.push(user);
        res.json(req.body); // response "Hola mundo!" en la pagina principal
   }else{
   res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
   }
  });

  server.post('/posts/author/:author', cors(corsOptions),(req, res, next)=>{ //Ruta para un GET a /
     let id=posts.length
     let post=req.body;
    post.author=req.params.author

   if(post.title && post.contents && post.author){
        post.id=id;
        posts.push(post);
        res.json(post); // 
   }else{
   res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
   }
  });

  server.get('/posts', cors(corsOptions),(req, res, next)=>{ //Ruta para un GET a /
     let miFilter=[];
     if(req.query.term){
          miFilter=posts.filter(p=> p.title.includes(req.query.term)||p.contents.includes(req.query.term));
          res.json(miFilter);
     }else{
          res.json(posts); 
     }
  });

  server.get('/posts/:author', cors(corsOptions),(req, res, next)=>{ //Ruta para un GET a /
     let miFilter=posts.filter(p=> p.author.includes(req.params.author));
     if(miFilter.length==0){  
          res.status(422).json({error: "No existe ningun post del autor indicado"})
     }else{
          res.json(miFilter);
     }
  }); 

  server.get('/posts/:author/:title', cors(corsOptions),(req, res, next)=>{ //Ruta para un GET a /
     let miFilter=posts.filter(p=> p.author.includes(req.params.author)&&p.title.includes(req.params.title));
     if(miFilter.length==0){  
          res.status(422).json({error: "No existe ningun post con dicho titulo y autor indicado"})
     }else{
          res.json(miFilter);
     }
  }); 

  server.put('/posts', cors(corsOptions),(req, res, next)=>{ 
     let post=req.body;
     if(post.id && post.title && post.contents && post.id<posts.length){
          posts[post.id].title=post.title;
          posts[post.id].contents=post.contents;
          res.json(posts[post.id]);
     }else{
          res.status(422).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
     }
  }); 

  server.delete('/posts', cors(corsOptions),(req, res, next)=>{ 
     let post=req.body;
     if(post.id<posts.length){
          res.json( {"success": true})
          posts[post.id]=null
     }else{
          res.status(422).json({error: "Mensaje de error"}) 
     }
     //console.log(id)
     // if(post.id && post.title && post.contents && post.id<posts.length){
     //      posts[post.id].title=post.title;
     //      posts[post.id].contents=post.contents;
     //      res.json(posts[post.id]);
     res.send('hola')
     // }else{
     //      res.status(422).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
     // }
  }); 


module.exports = { posts, server };
