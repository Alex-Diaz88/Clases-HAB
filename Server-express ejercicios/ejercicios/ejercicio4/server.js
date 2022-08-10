/**
 * ###################
 * ### Ejercicio 4 ###
 * ###################
 *
 * Servidor web que escucha en el puerto 4000.
 *
 * - Cuando la request es un 'POST' a '/data', se devuelve el *JSON* recibido.
 *
 * - Cuando se llama a cualquier otra ruta con cualquier método, devuelve status `404` (not found)
 * con el body:
 *
 *      {
 *          message: 'No lo encuentro'
 *      }
 */

// Lo que se pretende en el POST es que lo que se escriba en el JSON del body se envie como res.send() es una tontería
// solo para practicar

const express = require('express');

const app = express();

// Para poder leer el body hay que deserializarlo
app.use(express.json());

// Endpoint a /data
app.post('/data', (req, res) => {
    // Recuperamos las variables escritas en json del body
    const { dato1, dato2, dato3 } = req.body;

    // Se pueden hacer comprobaciones
    let variableNueva;
    if (!dato3) {
        variableNueva = 'No existe dato 3';
    }

    res.send({
        valor: dato1,
        valor2: dato2,
        valor3: dato3,
        variableNueva,
    });
});

// Middleware NOT FOUND
app.use((req, res) => {
    res.status(404);

    res.send({
        message: 'No lo encuentro',
    });
});

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});
