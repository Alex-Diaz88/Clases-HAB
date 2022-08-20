const getDB = require("../../db/getDB");

const modUsuario = async (req, res, next) => {

  let connection;

   
  try {
    connection = await getDB();
    
    const { idUser } = req.params;

    const { nombre, apellido1, apellido2 } = req.body;

    const [usuario] = await connection.query(
      `SELECT nombre, apellido1, apellido2 from usuario WHERE id = ?
      `,
      [idUser]
    )
    
    await connection.query(
      `UPDATE usuario   
      SET nombre = ?, apellido1  = ?, apellido2  = ? WHERE id = ?`,
      [nombre || usuario[0].nombre, apellido1 || usuario[0].apellido1, apellido2 || usuario[0].apellido2, idUser]
    );

    res.send ({
      status: 'Ok',
      message: 'Usuario modificado con éxito'
    });

  } catch (error) {
      next(error);

  } finally {
      if (connection) connection.release();
  }
};


module.exports = modUsuario;