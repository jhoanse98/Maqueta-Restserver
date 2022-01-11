const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/token");
const { googleVerify } = require("../helpers/googleVerify");


const login = async (req, res=response)  => {

    const { email, password} = req.body;

    try {

        //Validar que el usuario exista
        const usuario = await Usuario.findOne({email})
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

const googleSignIn = async (req, res=response) => {
    const {id_token} = req.body
    try {
        const {nombre, email, img} = await googleVerify(id_token)
        
        //buscamos ese usuario con el email
        let usuario = await Usuario.findOne({email})

        //Validamos si el usuario no existe en la BD lo creamos
        if(!usuario) {
            const data= {
                nombre,
                email,
                img,
                google:true,
                password:"google"
            }

            usuario= new Usuario(data);
            await usuario.save();
        }

        //si el usuario está en la BD

        if(!usuario.estado){
            return res.status(401).json({
                msg: "hable con el administrador"
            })
        }

        //Generamos el JWT
        const token = await generarJWT(usuario._id)

        res.status(200).send({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "No se pudo verificar el token"
        })
        console.log(error)
    }
}

module.exports = {
    login,
    googleSignIn
}