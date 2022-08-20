const getDB = require("../../db/getDB");
const { generateError, savePhoto } = require("../../helpers");

const addExpPhoto = async (req, res, next) => {
    let connection;

    try {
      connection = await getDB();

      const { idExp } = req.params;

    const [photos] = await connection.query(
      `select * from exp_photo where idExp = ?`,
      [idExp]
    );


    //* Si hay 5 o más fotos se lanza error
    if (photos.length >=5) {
      throw generateError('Ya hay 5 o más fotos de la experiencia', 409);
    }

    //* Si no se indica foto nueva se lanza error
    if(!req.files || !req.files.expPhoto) {
      throw generateError ('No has subido ninguna foto', 400)
    }

    //* Usar la función savePhoto para guardar la foto recibida en el directorio static/experiencias
    const photoName = await savePhoto(req.files.expPhoto, 1); //* 1 === tipo de foto experiencia para la ruta de experiencias

    //* Guardar en la BD el nombre de la imagen en la tabla exp_photo junto a la id de la Exp
    await connection.query(
      `insert into exp_photo (name, idExp)
      values (?, ?)`,
      [photoName, idExp]
    );

    //* Si todo va bien se lanza mensaje de ok
    res.send({
      status: 'Ok',
      message: 'Foto de experiencia insertada con éxito',
    });

    } catch (error) {
        next(error);
    } finally {
      if(connection) connection.release();
    }
};

module.exports = addExpPhoto;