const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').expect(200).send({array: [], num:null}));
    it('Debería devolver true si hay dos mumero con la posible suma ', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
    it('Debería devolver false si no hay dos mumero con la posible suma ', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 14})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));  
  });

  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').expect(200).send({string: 'hola'}));
    it('Debería devolver con 4 el string `hola`', () =>
      agent.post('/numString')
        .send({string: 'hola',})
        .then((res) => {
          expect(res.body.result).toEqual(4);
      }));
    it('Responder con un status 400 (bad request) si el string es un número.', () =>
      agent.post('/numString')
        .send({string: 3,})
        .then((res)=>expect(res.status).toEqual(400)));

    it('Responder con un status 400 (bad request) si el string esta vacio.', () =>
      agent.post('/numString')
        .send({string: '',})
        .then((res)=>expect(res.status).toEqual(400)));

  });

        describe('POST /pluck', () => {
          it('responds with 200', () => agent.post('/pluck').expect(200).send({array:[{color: 'azul', tamanio: 'grande', forma: 'cuadrado'}], propiedad: 'color'}));
          it('Responder con al funcionalidad del pluck.', () =>
            agent.post('/pluck')
              .send({array: [{color: 'azul', tamanio: 'grande', forma: 'cuadrado'},
              {color: 'blanco', tamanio: 'mediano', forma: 'redondo'},
              {color: 'verde', tamanio: 'pequeño', forma: 'triangular'}], propiedad: 'tamanio'})
              .then((res) =>expect(res.body.result).toEqual(['grande', 'mediano','pequeño'])
            ));

            it('Responder con un status 400 (bad request) si array no es un arreglo.', () =>
            agent.post('/pluck')
              .send({array: 3,})
              .then((res)=>expect(res.status).toEqual(400)));
      
          it('Responder con un status 400 (bad request) si el string propiedad está vacio.', () =>
            agent.post('/pluck')
              .send({array: [],})
              .then((res)=>expect(res.status).toEqual(400)));

          });
        
 
    

});