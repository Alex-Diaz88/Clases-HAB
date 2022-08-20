const getDB = require("../db/getDB");
const { generateError } = require("../helpers");

const canEditExp = async (req, res, next) => {
    let connection;

    try {
      connection = await getDB();

      //* Solo la empresa de la experiencia puede modificar datos
      //* id de la experiencia
      const { idExp } = req.params;

      //* id del usuario login
      const idReqUser = req.userAuth.id;

      //* Consulta a BD donde id corresponda a idExp
      const [user] = await connection.query(
        `select * from experiencias where id= ? and idEmpresaOrganiza = ?`,
        [idExp, idReqUser]
      );

      //* Si la consulta no devuelve resultado, la experiencia no pertenece a la empresa logueada
      if(user,this.length <1) {
        throw generateError('No eres propietario de la experiencia', 401);
      }

      //* Se continua si es el propietario
      next();

    } catch (error) {
        next(error);
    } finally {
      if(connection) connection.release();
    }
};

module.exports = canEditExp;