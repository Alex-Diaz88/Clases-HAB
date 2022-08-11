const getDB = require('../../db/getDB');

const getEmpresas = async (req, res, next) => {

  let connection;

  try {
    connection = await getDB();

    const [empresas] = await connection.query(`
      select nombre from empresa
    `)

    res.send({
      status: 'Ok',
      data: empresas,
    })

  } catch (error) {

    next(error);

  } finally {

    if (connection) connection.release();

  }
};

module.exports = getEmpresas;