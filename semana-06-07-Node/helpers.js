
/* 
    Archivo de ayuda donde crearemos funciones que utilizaremos en más de un archivo
*/
const { unlink } = require('fs/promises');
const path = require('path'); // dependencia que nos sirve para crear rutas absolutas
const sharp = require('sharp');
const uuid = require('uuid');

// Creamos la ruta absoluta a la carpeta de avatares
const avatarsDir = path.join(__dirname, 'static/avatars');

//Creamos la ruta absoluta a la carpeta de productos
const productsDir = path.join(__dirname, 'static/products');

// Funcion que genera un error
function generateError(message, code) {
    const error = new Error(message);
    error.httpStatus = code;
    return error;
}

// Funcion que elimina una foto del servidor
async function deletePhoto(photoName, type) {
    // añado una propiedad type para diferenciar ruta a avatares de productos 0 = avatars 1 = products

    try {
        let photoPath; // ruta absoluta a la imagen a borrar

        if (type === 0) {
            // Si el type es 0 es una imagen de avatar lo que enviamos
            // Creamos la ruta absoluta al directorio de avatares junto al nombre de imagen
            photoPath = path.join(avatarsDir, photoName);
        } else if (type === 1) {
            // Tipo 1 es imagen de productos
            photoPath = path.join(productsDir, photoName);
        }

        // Eliminamos la imagen
        await unlink(photoPath);
    } catch (error) {
        throw new Error('Error al eliminar la imagen del servidor');
    }
}

// Funcion que guarda una foto en el servidor, devolverá el nombre de la foto para guardarlo en la base de datos
async function savePhoto(imagen, type) {
    // recibimos la imagen y el tipo, para diferenciar si se guarda en la carpeta avatars o products

    try {
        // Convertir la imagen en un objeto sharp
        const sharpImage = sharp(imagen.data);

        // Variable que guardará la ruta absoluta a la carpeta donde se guarda la imagen junto a su nombre
        let imageDirectory;

        // Generar un nombre único a la imagen
        //* Hay 5 versiones, la 4 nunca da problema
        const imageName = uuid.v4() + '.jpg';

        // Segun el tipo de la imagen, creamos una ruta absoluta junto al nombre al directorio de avatars o products
        if (type === 0) {
            // Si el type es 0 es un avatar
            imageDirectory = path.join(avatarsDir, imageName);

            // Como es una imagen de avatar, vamos a redimensionarla para que sea más pequeña
            sharpImage.resize(150, 150);
        } else if (type === 1) {
            // Si es una imagen de tipo producto, es una ruta distinta
            imageDirectory = path.join(productsDir, imageName);
        }

        // Guardar la imagen
        await sharpImage.toFile(imageDirectory);

        // Retornar el nombre único de la imagen para guardarla en base de datos
        return imageName;
    } catch (error) {
        throw new Error('Error al procesar la imagen');
    }
}

//* Función que valide el esquema con los datos ingresados
async function validate (schema, data) {
    try {
       await schema.validateAsync(data); 
    } catch (error) {
       error.httpStatus = 400;
       throw error; 
    }
}

// El module.exports tiene que estar al final del archivo SIEMPRE
module.exports = {
    generateError,
    deletePhoto,
    savePhoto,
    validate,
};
