const Role = require("../models/role");
const Usuario = require("../models/usuario");

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



module.exports = {
    esRoleValido,
    emailExiste
}