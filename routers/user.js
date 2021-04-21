const { Router } = require('express');
const { UsuariosGet, UsuariosPut , UsuariosPost, UsuariosDelete } = require('../controllers/userController');
const router = Router();


router.get('/', UsuariosGet);
router.put('/:id', UsuariosPut);
router.post('/', UsuariosPost);
router.delete('/:id', UsuariosDelete);



module.exports = router;


