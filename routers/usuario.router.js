const {Router} = require('express');
const router = Router();
const usuarioCtrl = require('../controllers/usuario.controller.js');




router.post('/insertar', usuarioCtrl.crearUsuario );
router.get('/login', usuarioCtrl.verificarUsuario );



module.exports = router;