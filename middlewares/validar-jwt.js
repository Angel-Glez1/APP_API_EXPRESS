/*
|------------------------------------------------------------
|       TOKEN
|-----------------------------------------------------------
|
|  La funcion validarJWT como su nombre lo dice se
|  se encarga de validar la exitencia del token
|  el cual se genera al hacer el login de los
|  usuarios...Y si el token es valido extrae el id
|  del body del JWT para hacer un busqueda en la DDBB
|  y guardar el la req la info del usuario para asi
|  hacer las validacion segun el metodo solicitado....
|
*/

const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res = response, next) => {

    // Obtener el token del header
    const token = req.header('x-token');


    // Exite el token?
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la peticion' });
    }
    


    try {

        /* 
           1) Verificamos que el token lo haya generado mi backend.
           2) Obtener el uid del body del JWT 
        */
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        /* 1) Buscamos al usuario que hizo la requets en DDBB por el uid. */
        const usuario = await Usuario.findById(uid);


        /* Validar el usurio encontrado exita o no sea undefine */
        if (!usuario) {
            return res.status(401).json({ msg: 'Token no valido -Usuario inexistente' });

        }


        // Verificar el usuario no este elimado.
        if (!usuario.estado) {
            return res.status(401).json({ msg: 'Token no valido -Usuario castigo' });
        }


       /* Guardamos el usuario en la request para poder accerder ala info en user en diferentes metodos http y hacer su validaciones correspondientes */ 
       req.usuario = usuario;
       
        next();


    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token no valido' });
    }



}






module.exports = {
    validarJWT
}
