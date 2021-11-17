const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validaCampos } = require('../middlewares/valida-campos');

const router = Router()


router.post('/login', [
    check('email', "El correo no es válido").isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validaCampos,
],
login )


module.exports = router;