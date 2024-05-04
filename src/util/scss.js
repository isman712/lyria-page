const sass = require('sass');
const fs = require('fs');
const path = require('path');
const { elogs } = require('lyria-logs');

function compilarDirectorio(carpeta) {
    fs.readdir(carpeta, (err, archivos) => {
        if (err) {
            elogs.error('Error al leer la carpeta:', err);
            return;
        }

        archivos.forEach(archivo => {
            const rutaArchivo = path.join(carpeta, archivo);

            if (fs.statSync(rutaArchivo).isDirectory()) {
                compilarDirectorio(rutaArchivo);
            } else {
                if (archivo.endsWith('.scss')) {
                    sass.render({
                        file: rutaArchivo
                    }, function(err, result) {
                        if (!err) {
                            const nombreCSS = archivo.replace('.scss', '.css');
                            const rutaCSS = path.join(carpeta, nombreCSS);
                            const rutaCSS2 = path.join("./src/public/css", nombreCSS)
                            fs.writeFileSync(rutaCSS2, result.css.toString());
                            //elogs.info(`¡"${archivo}" compilado exitosamente como "${nombreCSS}"!`);
                        } else {
                            elogs.error(`Error al compilar "${archivo}":`, err);
                        }
                    });
                }
            }
        });
    });
}


module.exports = compilarDirectorio