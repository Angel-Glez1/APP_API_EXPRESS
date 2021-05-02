

const validaCampos = require('./validar-campos-body');
const validaJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');
const FileSystem = require('./validar-fileSystem');

    
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...FileSystem,
}

