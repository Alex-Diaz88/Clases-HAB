/**
 * ###################
 * ### Ejercicio 3 ###
 * ###################
 *
 *  Servidor web que escucha en el puerto 4000
 *
 *  - Cuando se llama a '/curso' con el método GET, devuelve status `200` con el body:
 *
 *      {
 *          curso: 'backend'
 *      }
 *
 *  - Cuando se llama al endpoint '/message' con metodo GET, devuelve status `200` con body:
 *
 *      {
 *          message: 'Hello World'
 *      }
 *
 *  - Cuando se llama a cualquier otra ruta con cualquier método, devuelve status `404` (not found)
 *      con el body:
 *
 *      {
 *          message: 'No lo encuentro :('
 *      }
 */

const express = require('express');

const app = express();

// Endpoint -> /curso
app.get('/curso', (req, res) => {
    // Por defecto devuelve estado 200

    res.send({
        curso: 'backend',
    });
});

// Endpoint -> /message
app.get('/message', (req, res) => {
    res.send({
        message: 'Hello World',
    });
});

// Middleware de NOT FOUND
app.use((req, res) => {
    // Estado 404
    res.status(404);

    res.send({
        message: 'No lo encuentro',
    });
});

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});
