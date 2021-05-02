const { Router } = require('express');
const { check } = require('express-validator');
const { validateCamps } = require('../middlewares/validar-campos-body');


const { login , googleSingIn } = require('../controllers/authController');


/**...  Instacia del Router  ...**/
const router = Router();

router.post('/login',
    
    [
        check('correo', 'El correo es oblig..').isEmail(),
        check('password', 'El password es Obligatoria').not().isEmpty(),
        validateCamps
    ],
    login
);


router.post('/google',
    
    [
        check('id_token', 'El id_token es obligatorio').not().isEmpty(),
        validateCamps
    ],
    googleSingIn
);


/**... Exportacion del Router ...**/
module.exports = router;
