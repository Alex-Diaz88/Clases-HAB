const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const bcrypt = require('bcrypt');

const editUserPassword = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;

        const { oldPass, newPass } = req.body;

        //* Comprobamos que existe el archivo del nuevo Password
        if (!oldPass || !newPass) {
            throw generateError('Debes indicar un nuevo Password', 400);
        }

        //* Recuperamos el Password antiguo del usuario en BD
        const [user] = await connection.query(
            `SELECT Password FROM user WHERE id = ?`,
            [idUser]
        );

        const isValid = await bcrypt.compare(oldPass, user[0].Password);

        //* Si existe un Password previo se elimina
        if (!isValid) {
            throw generateError('La constraseña antigua no coincide, 401');
        }

        const hashedPassword = await bcrypt.hash(newPass, 10);

        //* Modificar en BD la nueva contraseña
        await connection.query(`UPDATE user SET Password = ? WHERE id = ?`, 
        [hashedPassword, idUser]
        );

        res.send({
            status: 'Ok',
            message: 'Password actualizado con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserPassword;