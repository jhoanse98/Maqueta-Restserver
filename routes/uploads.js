const { Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivos, mostrarImagen, actualizarArchivoCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validator');
const { validarArchivo, validaCampos } = require('../middlewares');


const router = Router()

router.post("/", validarArchivo, cargarArchivo)

router.put("/:coleccion/:id", [
validarArchivo,
check('id', 'Debe ser un mongo ID válido').isMongoId(),
check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
validaCampos
], actualizarArchivoCloudinary)

router.get("/:coleccion/:id", [
check('id', 'Debe ser un mongo ID válido').isMongoId(),
check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
validaCampos    
], mostrarImagen)

module.exports = router;