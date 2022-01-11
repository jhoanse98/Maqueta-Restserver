const { Router } = require('express')
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoriasPaginadas, obtenerCategoriaId, actualizarCategoria, eliminarCategoria } = require('../controllers/categoria');
const { existeCategoriaId } = require('../helpers/db-validator');
const { validarJWT, validaCampos, esAdminRol } = require('../middlewares');


const router = Router();

router.get('/', 
obtenerCategoriasPaginadas
)


//get por id
router.get('/:id',
check('id', 'No es un id de Mongo').isMongoId(),
check('id').custom(existeCategoriaId),
validaCampos,
obtenerCategoriaId/*(req, res) => (
    res.json('categorias get por id') */
)

//crear categoria - se requiere de jsonwebtoken
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validaCampos
], crearCategoria)

//actualizar categoria
router.put('/:id', 
validarJWT,
check('id', 'No es un id de Mongo').isMongoId(),
check('id').custom(existeCategoriaId),
check('nombre').not().isEmpty(),
validaCampos,
actualizarCategoria
)

//delete categoria
router.delete('/:id',
validarJWT,
esAdminRol,
check('id', 'No es un id de Mongo').isMongoId(),
check('id').custom(existeCategoriaId),
validaCampos,
eliminarCategoria 
)


module.exports = router