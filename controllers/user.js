//Lo usamos para obtener los métodos de response en nuestras funciones
const { response } = require('express');
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { validationResult } = require('express-validator');

const getUsuarios = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query
    const query = {estado:true}

    /*
    const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    const total = await Usuario.count(query)
    */
        
    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    
    //const {q, nombre, apellido, familiar, for_sale } = query
    res.json({
        total,
        usuarios
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

const deleteUsuario = async (req, res = response ) => {

    const {id} = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id) borrado físico

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        msg: 'Delete desde el controlador',
        id,
        usuario
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