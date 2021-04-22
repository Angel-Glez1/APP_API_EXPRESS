
const { validationResult } = require('express-validator');

/**
 * TODO: validateCamps
 * Retorna los errores que se hayan generado por estar mal la data que se mando antes de llamar al 
 * 
 * contorlador
 * 
 */

const validateCamps = (req, res, next) => {

    // Obtener arrays de errores
    const errors = validationResult(req);

    // Validar si el array tiene algo.
    if (!errors.isEmpty()) return res.status(400).json(errors);
    
    // Si no hay errores llama al controller. 
    next();
}


//**...  EXPORTACION DE MIDDLEWARES   ....**//
module.exports = {
    validateCamps,
}


