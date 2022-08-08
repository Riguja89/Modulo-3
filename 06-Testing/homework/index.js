const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

  app.post('/sum', (req, res) => {
    res.send({
      result: req.body.a + req.body.b,
    });
});

app.post('/sumArray', (req, res) => {

  let array= req.body.array;
  let num = req.body.num;
if (array.length>0){
  for (i=0; i<array.length;i++){
    for(j=i+1;j<array.length;j++){
      if(array[i]+array[j]==num){
        res.send({
          result: true,
        });
      }
    }
  }
}
  res.send({
    result: false,
  });
});

app.post('/numString', (req, res) => {
  let string= req.body.string;
  if(typeof string!= 'number' && string.length>0){
    res.status(200).send({
      result: string.length,
    });
  }else{
  res.status(400).send({
    message: "Error en la solicitud"
  });
}
});

app.post('/pluck', (req, res) => {
  let array= req.body.array;
  let propiedad=req.body.propiedad;
  let myarray=[]
 
  if(array.length>0 && propiedad){
    
    array.map((o)=>myarray.push(o[propiedad]));
    res.send({
      result: myarray,
    });
  }else{
  res.status(400).send({
    message: "Error en la solicitud"
  });
}
});


module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
