
const validaCampos = require('../middlewares/valida-campos');
const validaJWT = require('../middlewares/validaJWT');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/valida-archivo')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo
}