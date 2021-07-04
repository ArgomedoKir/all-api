const {Router} = require('express');
const router = Router();
const usuarioCtrl = require('../controllers/usuario.controller.js');




router.post('/insertar', usuarioCtrl.crearUsuario );
router.post('/login', usuarioCtrl.verificarUsuario );
router.get('/obtenerInfo', usuarioCtrl.obtenerInformacionUsuario );
router.post('/updateUsuario', usuarioCtrl.updateUsuario );

module.exports = router;