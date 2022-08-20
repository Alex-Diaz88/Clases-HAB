const getDB = require('../../db/getDB');

const listExperiences = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { search, maxPrice, direction, order } = req.query; // ?search=kayak&order=precio&direction=DESC

        //* Declaramos las opciones válidas
        const validOrderOptions = ['titulo', 'precio', 'localizacion'];

        const validDirectionOption = ['ASC', 'DESC'];

        //* Creamos la variable de order y direction con una opcion válida
        const orderBy = validOrderOptions.includes(order) ? order : 'precio';

        const orderDirection = validDirectionOption.includes(direction)
            ? direction
            : 'DESC';

        //* Declaramos la variable que guardará la consulta a la base de datos
        let consulta = 'select * from experiencias';

        if (search) {
            consulta += ' where titulo like ?';
        }

        if (maxPrice) {
            consulta += ' and precio < ?';
        }

        [consulta] = await connection.query(
            consulta + ` order by ${orderBy} ${orderDirection}`,
            [`%${search}%`, maxPrice]
        );

        res.send({
            status: 'ok',
            data: consulta,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = listExperiences;
