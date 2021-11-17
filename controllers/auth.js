const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/token");


const login = async (req, res=response)  => {

    const { email, password} = req.body;

    try {

        //Validar que el usuario exista
        const usuario = await Usuario.findOne({email})
        console.log(usuario)
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario/password no son correctos - correo"
            })
        }


        //validar que el usuario esté activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario/password no son correctos - estado igual a false"
            })
        }


        //validar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validaPassword){
            return res.status(400).json({
                msg: "Usuario/password no son correctos - password no válida"
            })
        }

        //Generar el JWT

        const token = await generarJWT(usuario._id)


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

    
}

module.exports = {
    login
}