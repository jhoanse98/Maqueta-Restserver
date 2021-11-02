const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/user');
const { esRoleValido, emailExiste, existeUsuarioId } = require('../helpers/db-validator');
const { validaCampos } = require('../middlewares/valida-campos');
 

const router = Router();

router.get('/', getUsuarios)

router.post('/',[
    check("email", "El email que ingresó no es válido").isEmail(),
    check('email').custom(emailExiste),
    check("nombre", "El nombre debe ser obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener minimo 6 caracteres").isLength({min: 6}),
    //check("rol", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validaCampos
], postUsuario)

router.put('/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check("rol").custom(esRoleValido),
    validaCampos,
], putUsuario)

router.delete('/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validaCampos
], deleteUsuario)

module.exports = router;