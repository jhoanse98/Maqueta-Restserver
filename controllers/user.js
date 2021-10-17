//Lo usamos para obtener los métodos de response en nuestras funciones
const { response } = require('express');

const Usuario = require("../models/usuario");

const getUsuarios = (req, res = response) => {

    const query = req.query;

    const {q, nombre, apellido, familiar } = query
    res.json({
        ok: 'get desde el controlador',
        q,
        nombre,
        apellido,
        familiar
    })
}

const postUsuario = async (req, res = response) => {

    const {nombre, email, password, rol} = req.body;
    console.log(req.body)

    const usuario = new Usuario({nombre, email, password, rol}) //creamos la instancia del modelo

    await usuario.save()

    res.json({
        msg: 'Post desde el controlador',
        usuario
    })
}

const deleteUsuario = (req, res = response ) => {
    res.json({
        msg: 'Delete desde el controlador'
    })
}

const putUsuario = (req, res = response) => {

    const id = req.params.id
    res.json({
        msg: 'Put desde el controlador',
        id
    })
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}