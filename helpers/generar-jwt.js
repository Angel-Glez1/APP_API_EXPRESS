const jwt = require('jsonwebtoken');

// uid = IDENTIFICADOR UNICO DEL USUARIO
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        // Generar body ó payLoad del JWT
        const payLoad = { uid };


        // Generar el JWT
        jwt.sign(
            payLoad,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '4h' },
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('No se puedo Generar el token ');
                } else {
                    resolve(token);
                }
            }
        );

    });
}


module.exports = {
    generarJWT
}