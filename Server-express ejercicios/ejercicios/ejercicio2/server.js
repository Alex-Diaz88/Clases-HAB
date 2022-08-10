/**
 * ###################
 * ### Ejercicio 2 ###
 * ###################
 *
 * Servidor web que escucha en el puerto 4000
 *
 * - Cuando se llama a la ruta '/curso', método get devuelve el status `200` con el body:
 *
 *      {
 *          curso: 'backend'
 *      }
 *
 * - Cuando se llama a cualquier ruta distinta devuelve status `200` con el body:
 *
 *      {
 *          message: 'Hello World'
 *      }
 */

const express = require('express');

const app = express();

// Ruta /curso | ENDPOINT
app.get('/curso', (req, res) => {
    // Por defecto cuando una respuesta va bien, el estado es 200

    res.send({
        curso: 'backend',
    });
});

// Para cualquier otra ruta
app.use((req, res) => {
    res.send({
        message: 'Hello World',
    });
});

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});
