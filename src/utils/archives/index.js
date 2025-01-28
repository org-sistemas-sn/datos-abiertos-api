// Obtener la ruta del directorio actual
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

// Función para leer el archivo .json generado por el script de Python
export const readJsonFile = (filePath) => {
    // Generamos una promesa para poder leer el archivo de forma asíncrona
    return new Promise((resolve, reject) => {
        // Leer el archivo .json
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // Si hay un error al leer el archivo, rechazar la promesa (Si surge algun error probablemente sea la ruta)
                reject(new Error(`Error al leer el archivo .json: ${err.message}`));
            } else {
                // Si se lee correctamente, intentar parsear el contenido del archivo
                try {
                    // Devolver el contenido del archivo parseado
                    resolve(JSON.parse(data));
                } catch (parseError) {
                    reject(new Error(`Error al parsear el archivo JSON: ${parseError.message}`));
                }
            }
        });
    });
};

// Función para eliminar un archivo
export const deleteFile = (filePath) => {
    // Generamos una promesa para poder eliminar el archivo de forma asíncrona
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(new Error(`Error al eliminar el archivo: ${err.message}`));
            } else {
                resolve();
            }
        });
    });
};