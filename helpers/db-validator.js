const Categoria = require("../models/categoria");
const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error("El rol suministrado no está registrado en la BD")
    }
}

const emailExiste = async (email = "") => {
    const validaEmail = await Usuario.findOne({email})

    if(validaEmail){
        throw new Error("El correo ya está registrado en la BD")
    }
}

const existeUsuarioId = async (id) => {
    const usuarioId = await Usuario.findById(id)

    if (!usuarioId){
        throw new Error(`No existe un usuario con este Id ${id}`)
    }
}

const existeCategoriaId = async (id) => {
    const categoriaId = await Categoria.findById(id)
    if(!categoriaId){
        throw new Error(`No existe una categoria con este id: ${id}`)
    }
}


const existeProductoId = async (id) => {
    const productoId = await Producto.findById(id)
    if(!productoId){
        throw new Error(`No existe un producto con este id: ${id}`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId
}