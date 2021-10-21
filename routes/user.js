const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/user');

const router = Router();

router.get('/', getUsuarios)

router.post('/',[
    check("email", "El email que ingresó no es válido").isEmail()
], postUsuario)

router.put('/:id', putUsuario)

router.delete('/', deleteUsuario)

module.exports = router;