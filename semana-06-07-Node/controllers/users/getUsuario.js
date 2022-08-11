const getDB = require("../../db/getDB");
const { generateError } = require("../../helpers");

const getUsuario = async (req, res, next) => {

  let connection;

  try {
    connection = await getDB();

    const { idUser } = req.params;

    const [usuario] = await connection.query(
      `select * from usuario where id = ?`,
      [idUser]
    );

    if (usuario.length < 1) {
      throw generateError ('No existe usuario seleccionado', 404);
    }

    res.send ({
      status: 'Ok',
      data: usuario[0],
    });

  } catch (error) {
      next(error);

  } finally {
      if (connection) connection.release();
  }
};


module.exports = getUsuario;