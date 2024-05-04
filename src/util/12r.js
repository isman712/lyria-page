const fs = require('fs');


function lyria12r(rutaArchivo) {
    const contenido = fs.readFileSync(rutaArchivo, 'utf8');
    const lineas = contenido.split(/\r?\n/);
    const datos = [];

    let nombreCampoActual = '';
    let datosCampoActual = {};
    let nc = 0
    for (let linea of lineas) {
        if (linea.startsWith('!') || linea === '') {
            continue;
        }
        if (!/^ {4}/.test(linea)) {
            if (Object.keys(datosCampoActual).length > 0) {
                datos.push({ [nombreCampoActual]: datosCampoActual });
                datosCampoActual = {};
            }
            nombreCampoActual = linea;
        } else {
            const valorCampo = nombreCampoActual;
            const valorDato = linea;
            datosCampoActual[nc] = valorDato.trim(); 
            nc = nc + 1
        }
    }
    if (Object.keys(datosCampoActual).length > 0) {
        datos.push({ [nombreCampoActual]: datosCampoActual });
    }

    return datos;
}

const rutaArchivo = './src/data/isman.12r';
async function leer(){
    const datosLeidos = lyria12r(rutaArchivo);
    console.log(datosLeidos);
}

leer()