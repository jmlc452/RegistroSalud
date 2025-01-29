const path = require('path');
const {v4:uuidv4} = require('uuid')


const subirArchivo = (files,extencionesValidas = ['jpg', 'png', 'jpeg', 'gif'],carpeta='') => {
    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');

        const extencion = nombreCortado[nombreCortado.length - 1];

        if (!extencionesValidas.includes(extencion)) {
            return reject(`la extencion ${extencion} no esta permitida, solo se permiten archivos de esxtencion ${extencionesValidas}`)
        }

        const nombreTemp = uuidv4() + '.' + extencion
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp);

        archivo.mv(uploadPath, function (err) {
            if (err) {
                reject(err)
            }
            resolve(nombreTemp);
        });
    })
}

module.exports={

    subirArchivo
}

