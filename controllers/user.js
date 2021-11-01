//Lo usamos para obtener los métodos de response en nuestras funciones
const { response } = require('express');
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { validationResult } = require('express-validator');

const getUsuarios = (req, res = response) => {

    const query = req.query;

    const {q, nombre, apellido, familiar, for_sale } = query
    console.log(query)
    res.json({
        ok: 'get desde el controlador',
        query
    })
}

const postUsuario = async (req, res = response) => {

    const {nombre, email, password, rol} = req.body;
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            msg: "Hay errores",
            errores
        })
    }



    const usuario = new Usuario({nombre, email, password, rol}) //creamos la instancia del modelo

    //encriptar 
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en la BD
    await usuario.save()

    res.json({
        usuario
    })
}

const deleteUsuario = (req, res = response ) => {
    res.json({
        msg: 'Delete desde el controlador'
    })
}

const putUsuario = async (req, res = response) => {

    const id = req.params.id
    const {password, google, email, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Put desde el controlador',
        usuario
    })
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}