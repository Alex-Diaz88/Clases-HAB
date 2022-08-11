const express = require ('express');

const app = express();

app.use(express.json());


//* CONTROLADORES DE USUARIO:
const newUser = require('./controllers/users/newUser');
const loginUsuario = require('./controllers/users/loginUsuario');
const getUsuario = require('./controllers/users/getUsuario');
const modUsuario = require('./controllers/users/modificarUser');
const newAdmin = require('./controllers/users/newAdmin');

//* CONTROLADORES DE EMPRESA:
const getEmpresas = require('./controllers/empresa/getEmpresas');


//* ENDPOINTS DE USUARIO:
//* Registro de usuario
app.post('/registro', newUser);
//* Login de usuario
app.post('/login', loginUsuario);
//* Recuperar datos de un usuario
app.get('/getUser/:idUser', getUsuario);
//* Modificar datos de un usuario
app.put('/user/:idUser', modUsuario);
//* Registro de administrador
app.post('/regAdmin', newAdmin);


//* ENDPOINTS DE EMPRESA:
app.get('/getempresa', getEmpresas);


//* MIDDLEWARE DE ERROR:
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500)

  res.send({
      status: 'Error',
      message: error.message,
  });
});


//* MIDDLEWARE DE NOT FOUND:
app.use((req, res) => {
  res.status(404);
  
  res.send({
      status: 'Error',
      message: 'Not Found',
  });
});


app.listen(4000, () => {
  console.log('Server listening at http://localhost:4000');
});