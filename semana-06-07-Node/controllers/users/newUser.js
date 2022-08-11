const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers.js');

const newUser = async (req, res, next) => {

  let connection;

  try {

    connection = await getDB();

    const { nombre, apellido1, email, password } = req.body;

    if(!nombre || !apellido1 || !email || !password) {
      //* Función exportada de helpers.js
      throw generateError ('Faltan campos obligatorios', 400);
    }

    const [usuario] = await connection.query(
        `select id from usuario where email = ?`,
        [email]
    );

    if(usuario.length > 0) {
      throw generateError ('Ya existe un usuario con ese email', 409);
    }


    //* Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);


    //* Insertar nuevo usuario
    await connection.query(`
      insert into usuario (nombre, apellido1, email, password)
      values (?, ?, ?, ?)`,
      [nombre, apellido1, email, hashedPassword]
    );

    res.send({
      status: 'Ok',
      message: 'Usuario creado con exito'
    })

  } catch (error) {
    next(error);

  } finally {
    if (connection) connection.release();
  }

};

module.exports = newUser;