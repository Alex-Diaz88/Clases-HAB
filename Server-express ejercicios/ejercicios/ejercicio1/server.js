/**
 * ###################
 * ### Ejercicio 1 ###
 * ###################
 *
 * Crea un servidor web que escucha cualquier request en el puerto 4000 y devuelve siempre un status `200` con el body:
 *
 *      {
 *          curso: 'backend'
 *      }
 */

///////

const express = require('express'); // Cuando queremos trabajar con una dependencia hay que requerirla AL INICIO

const app = express(); // Crea un servidor/aplicacion

// Para escuchar y devolver una respuesta ante cualquier peticion usaremos un middleware
app.use((req, res) => {
    // Establecemos que el status de la respuesta es el 200
    res.status(200);

    // En la respuesta podemos enviar todo tipo de variables JavaScript
    let coche = {
        modelo: 'Corsa',
        marca: 'Opel',
        precio: 15000,
    };

    // Devolvemos la respuesta
    res.send({
        curso: 'backend',
        frase: 'esto se ejecuta',
        coche,
    });
});

// Ponemos el servidor a la escucha en el puerto 4000
app.listen(4000, () => {
    console.log(`Server listening at http://localhost:4000`);
});
