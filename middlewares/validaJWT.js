const { response } = require("express");
const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');


const validarJWT = async (req=response, res, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try{
        const {uid} = jwt.verify(token, process.env.PRIVATEKEY)

        const usuarioautenticado = await Usuario.findById(uid)

        if(!usuarioautenticado){
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en la BD'
            })
        }

        if(!usuarioautenticado.estado){
            return res.status(401).json({
                msg:'Token no valido - Usuario estado es False'
            })
        }

        req.usuario = usuarioautenticado

        next()
    } catch(error){
        console.log(error)
        res.status(401).json({
            msg: 'token no válido'
        })
    }

}

module.exports = {
    validarJWT
}