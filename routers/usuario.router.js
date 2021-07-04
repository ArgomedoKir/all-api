const {Router} = require('express');
const router = Router();
const usuarioCtrl = require('../controllers/usuario.controller.js');




router.post('/insertar', usuarioCtrl.crearUsuario );
router.post('/login', usuarioCtrl.verificarUsuario );



module.exports = router;