const express = require ('express');

const app = express();

//* Requerir dotenv
require('dotenv').config();

app.use(express.json());

//* ----MIDDLEWARES----
const isAuth = require('./middlewares/isAuth');
const canEditUser = require('./middlewares/canEditUser');
const canEditExp = require('./middlewares/canEditExp');
const isAdmin = require('./middlewares/isAdmin');

//* ----CONTROLADORES DE USUARIO----
const newUser = require('./controllers/users/newUser');
const loginUsuario = require('./controllers/users/loginUsuario');
const getUsuario = require('./controllers/users/getUsuario');
const modUsuario = require('./controllers/users/modificarUser');
const editUserPassword = require('./controllers/users/editUserPassword');
const newAdmin = require('./controllers/users/newAdmin');

//* ----CONTROLADORES DE EMPRESA----
const getEmpresas = require('./controllers/empresa/getEmpresas');
const addExpPhoto = require('./controllers/empresa/addExpPhoto');
const listExperiences = require('./controllers/empresa/listExperiences');
const deleteExperience = require('./controllers/empresa/deleteExperience');
const newCompany = require('./controllers/empresa/newCompany');


//* ----ENDPOINTS DE USUARIO----
//* Registro de usuario
app.post('/registro', newUser);
//* Login de usuario
app.post('/login', loginUsuario);
//* Recuperar datos de un usuario
app.get('/getUser/:idUser', getUsuario);
//* Modificar datos de un usuario
app.put('/user/:idUser', isAuth, canEditUser, modUsuario);
//* Modificar contraseña de un usuario
app.put('/user/:idUser/pass', isAuth, canEditUser, editUserPassword)
//* Registro de administrador
app.post('/registro/Admin', isAdmin, newAdmin);


//* ----ENDPOINTS DE EMPRESA----
//* Lista de empresas
app.get('/getempresa', getEmpresas);
//* Añadir foto de producto
app.put('/experiencias/:idExp/photo', isAuth, canEditExp, addExpPhoto);
//* Lista experiencias
app.get('/getexperiencias', listExperiences);
//* Borrar experiencia
app.delete('/company/:idCompany', isAuth, isAdmin, deleteExperience);
//* Nueva compañía
app.post('/company', isAuth, isAdmin, newCompany);


//* ----MIDDLEWARE DE ERROR----
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500)

  res.send({
      status: 'Error',
      message: error.message,
  });
});


//* ----MIDDLEWARE DE NOT FOUND----
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