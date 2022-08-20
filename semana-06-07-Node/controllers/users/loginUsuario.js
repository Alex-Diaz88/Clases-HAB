const getDB = require("../../db/getDB");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require("../../helpers");
require('dotenv').config();

const loginUsuario = async (req, res, next) => {

  let connection;

  try {
    connection = await getDB();

    //* Comprobar que los campos obligatorios están cubiertos
    const { email, password } = req.body
    if (!email || !password) {
        throw generateError ('Faltan campos obligatorios', 400);
    }

    //* Comprobar que existe un usuario con ese email en la BD
    const [usuario] = await connection.query(
      `select id, email, password from usuario where email = ?`,
      [email]
    );

    //* Comprobar que el usuario ya está registrado
    if (usuario.length < 1) {
      throw generateError ('No existe usuario con ese email', 404);
    }

    //* Comprobar contraseñas
    const validPassword = await bcrypt.compare(password, usuario[0].password);
    if (!validPassword) {
      throw generateError ('Contraseña incorrecta', 401);
    }

    //* Generar token de inicio de sesión
    const tokenInfo = {
      id: usuario[0].id,
    };

    //* Crear token con el método 'sign'
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '1d',
    });

    //* Devolver el token
    res.send({
      status: "Ok",
      message: token,
      })

    res.send({
      status: 'Ok',
      authToken: token,
    })

  } catch (error) {
      next(error);

  } finally {
      if (connection) connection.release();
  }
};

module.exports = loginUsuario;


