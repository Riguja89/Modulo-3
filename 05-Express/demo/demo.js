const express = require('express');
//const morgan = require('morgan')

//Creamos el servidor
const app = express()

// bodyParser ===  express.json()
//const jsonParser = express.json()

//Método que nos permite settear middlewares para todo mi app de express
app.use(express.json())
//app.use(morgan('dev'))
app.use('/', function(req, res, next) {
    console.log('Entró a ' + req.url)
    next() //Le doy paso al siguiente middleware
})

const array = []

//Endpoints / rutas 

//GET --> solicitamos data

app.get('/', function(req, res) {
    //console.log(req.url)
    //Cualquier lógica
    res.send('Ruta GET')
    //res.sendStatus(404)
})

app.get('/users', function(req, res) {
    //console.log(req.url) // /users
    res.status(200).send('Ruta USERS')
})

app.get('/product', function(req, res) {
    var obj = {
        producto: 'Remera',
        stock: 10
    }

    res.json(obj)
})

//POST --> crear nueva data

// body --> {name: 'Juan' apellido: 'Bosque'}
// query --> /home?id=1
// params --> /home/:id

app.post('/users', (req, res, next) => {
    //Crear un nuevo usuario
    const user = req.body; //{"name": "Juan", "apellido": "Bosque"}
    console.log(user) 
    res.send('ok, llegó el usuario')
})

app.put('/api/:id/:algo', (req, res) => {
    const { id, algo} = req.params; //{id: 3, algo: 'hola'}
    console.log(id)
    console.log(algo)
    res.sendStatus(200)
})

app.put('/api', (req, res) => {
    const { id } = req.query; //{id: 2 }
    array.push(id)
    console.log(array)
    res.sendStatus(200)
})

app.listen(3000, console.log('Escuchando en el puerto 3000!'))


