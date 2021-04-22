const { response } = require('express');
const bcrytpjs = require('bcryptjs');

const Usuario = require('../models/usuario');

/**
 * TODO: Retorna los usuarios....
 *  Muestra los usuarios con un paginacion por defecto 
 *  de 10 registro ala vez 
 */
const UsuariosGet = async (req, res = response) => {

    // Obtener argumentos Opcionales (req.query).
    const { limite = 5, desde = 0 } = req.query;

    // Condicion para la consulta.
    const query = { estado: true };

    // Las consultas a la DDBB.
    const promises = [
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments(query)
    ];


    // Ejecucion de las consultas
    try {

        const [usuarios, total] = await Promise.all(promises);
        res.json({ total, usuarios });

    } catch (error) {
        res.json(error);
    }

}

/**
 * TODO: Inserta un nuevo usuario...
 */
const UsuariosPost = async (req, res = response) => {

    // Data the new User
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Hacer el hash del password
    const salt = bcrytpjs.genSaltSync();
    usuario.password = bcrytpjs.hashSync(password, salt);

    // Save new User
    await usuario.save(usuario);
    res.json(usuario);

}

/**
 * TODO: Actiliza un registro de la DDBB
*/
const UsuariosPut = async (req, res = response) => {

    // Obtener el id del usuario a actulizar de la url
    const { id } = req.params;

    // Separar los datos que se puede actulizar de los que no..
    const { _id, password, google, correo, ...datosParaActualizar } = req.body;

    // TODO : VALIDAR CONTRA DDBB
    if (password) {
        const salt = bcrytpjs.genSaltSync();
        resto.password = bcrytpjs.hashSync(password, salt);
    }

    // Actulizar el usuario y retornar los nuevos cambios
    const usuario = await Usuario.findByIdAndUpdate(id, datosParaActualizar, { new: true });
    res.status(200).json(usuario);
    
}

/**
 * TODO: Elimina un registro
 */

const UsuariosDelete = async (req, res = response, next) => {
    const { id } = req.params;
    
    // Borrado Fisico
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Borrado Logico
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(usuario);

    next();
}



/*... Exportacion de las funciones para el Router de usuarios ....*/ 
module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}