const { Router } = require('express');
const { check } = require('express-validator');

const { validateCamps, validarJWT, tieneRol, isAdminRol, } = require('../middlewares');
const { isValidateRol, issetEmail, issetUserID } = require('../helpers/dbvalidators');

const { UsuariosGet, UsuariosPut, UsuariosPost, UsuariosDelete } = require('../controllers/userController');


// INSTANCIA del Router
const router = Router();

// TODO: METHOD GET */
router.get('/', UsuariosGet);



// TODO: METHOD PUT */
router.put('/:id',

  // Middlewares que validar data antes del llamar al controlador
  [
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(issetUserID),
    check('rol').custom(isValidateRol),
    validateCamps
  ],

  // Referencia al controller 
  UsuariosPut
);



// TODO: METHOD POST */
router.post('/',

  // Middlewares que validar data antes del llamar al controlador
  [
    check('nombre', 'Nombre obligatorio, Min de 3 caract.').not().isEmpty().isLength({ min: 3 }),
    check('password', 'Password  obligatoria . Min 6 caract').isLength({ min: 6 }),
    check('correo', 'No es un correo  valido').isEmail(),
    check('correo').custom(issetEmail),
    check('rol').custom(isValidateRol),
    validateCamps
  ],

  /**... Referencia al controller... **/
  UsuariosPost
);



//TODO: METHOD DELETE */
router.delete('/:id',

  /* Middlewares que validar data antes del llamar al controlador */
  [
    validarJWT,
    // isAdminRol,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(issetUserID),
    validateCamps
  ],
  /**... Referencia al controller... **/
  UsuariosDelete
);


// Esta exportacion se ocupa en el modelo de SERVER para definir la rutas 
module.exports = router;











