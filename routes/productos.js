const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductosPorId, actualizarProducto, eliminarProducto } = require('../controllers/producto');
const { existeProductoId } = require('../helpers/db-validator');
const { validarJWT, validaCampos, esAdminRol } = require('../middlewares');




const router = Router();


//Obtener productos

router.get('/', obtenerProductos)

//Obtener productos por id
router.get('/:id', 
check('id', 'El id no es válido').isMongoId(),
check('id', 'Este id no existe en la BD').custom(existeProductoId),
validaCampos,
obtenerProductosPorId)

//ruta de creación de productos
router.post('/',
validarJWT,
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('disponibilidad', 'La disponibilidad es obligatoria').isBoolean(),
check('categoria', 'La categoria es obligatoria').not().isEmpty(),
validaCampos,
crearProducto)

//Actualizar Productos
router.put('/:id', 
validarJWT,
check('id', 'El id no es válido').isMongoId(),
check('id', 'Este id no existe en la BD').custom(existeProductoId),
validaCampos,
actualizarProducto)

//Eliminar Productos
router.delete('/:id', 
validarJWT,
esAdminRol,
check('id', 'El id no es válido').isMongoId(),
check('id', 'Este id no existe en la BD').custom(existeProductoId),
validaCampos,
eliminarProducto)

module.exports = router