const express = require ('express');

const app = express();

app.use(express.json());


//* CONTROLADORES
const getTime = require('./controllers/getTime');
const getDir = require('./controllers/getDir');
const getNumber = require('./controllers/getNumber');
const newUser = require('./controllers/newUser');


//* ENDPOINTS
app.get('/hora', getTime);
app.get('/dir', getDir);
app.get('/number/:number', getNumber);
app.get('/user', newUser);


//* Servidor a escucha
app.listen(4000, () => {
  console.log('Server listening at http://localhost:4000');
});

//* MIDDLEWARE DE ERROR
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500)

  res.send({
      status: 'Error',
      message: error.message,
  });
});

//* MIDDLEWARE de NOT FOUND
app.use((req, res) => {
  res.status(404);
  
  res.send({
      status: 'Error',
      message: 'Not Found',
  });
});
