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
    var id=posts.length
   var user=req.body;
   if(user.title && user.contents && user.author){
        user.id=id;
        posts.push(user);
        res.json(req.body); // response "Hola mundo!" en la pagina principal
   }else{
   res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
   }
  });


module.exports = { posts, server };
