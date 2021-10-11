const { Router } = require('express');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/user');

const router = Router();

router.get('/', getUsuarios)

router.post('/', postUsuario)

router.put('/:id', putUsuario)

router.delete('/', deleteUsuario)

module.exports = router;