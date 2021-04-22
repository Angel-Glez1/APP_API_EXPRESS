const Role = require('../models/role');
const Usuario = require('../models/usuario');


/**
 * ?NOTA
 * Estas funciones se usan en las rutas de lo susuarios
 * validad los datos que se envian haci en controlador y si estan mal
 * entonces retornamos los errores que dicen como esperamos esos datos.
 * 
 */


// Valida que el exite el rol en la db
const isValidateRol = async ( rol = '' ) => {

    const exiteRol = await Role.findOne({ rol });
    if (!exiteRol) throw new Error(`El rol ${rol} no exite en la BBDD`);

}


// Verifica si exite un usuario con el mismo email
const issetEmail = async (correo = '') => {
    
    const IssetEmail = await Usuario.findOne({ correo });
    if (IssetEmail) throw new Error(`Este correo : ${correo} ya exite`);

}



// Verifica que exita el id del usuario para hacer un GET PUT ó DELETE
const issetUserID = async id  => {
    
    const IssetEmail = await Usuario.findById(id);
    if (!IssetEmail) throw new Error(`No exite el usuario con el ID : ${id} `);
    
}


module.exports = {
    isValidateRol,
    issetEmail,
    issetUserID
}
