
const validaCampos = require('../middlewares/valida-campos');
const validaJWT = require('../middlewares/validaJWT');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}