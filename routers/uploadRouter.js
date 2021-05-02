const { Router } = require('express');
const { check } = require('express-validator');


const { coleccionesPermitidas } = require('../helpers');
const { validateCamps, validarArchivo } = require('../middlewares');
const { cargarArchivos ,  mostarImg, actualizarImagenCloudinary } = require('../controllers');


//*... EndPoints ...*// 
const router = Router();

router.post('/', validarArchivo  ,cargarArchivos);


// Actuliza la propiedad de img de los usuarios o productos....
router.put('/:coleccion/:id',
    [
        validarArchivo,
        check('id', `No es un id valido de mongo`).isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
        validateCamps
    ],
    actualizarImagenCloudinary
);


// Sirve los img 
router.get('/:coleccion/:id',
    [
        check('id', `No es un id valido de mongo`).isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validateCamps
    ],
    mostarImg
);




 



module.exports = router;
