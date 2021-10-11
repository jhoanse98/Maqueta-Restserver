//Lo usamos para obtener los métodos de response en nuestras funciones
const { response } = require('express');

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

const postUsuario = (req, res = response) => {

    const body = req.body;
    console.log(req.body)

    console.log(body)
    res.json({
        msg: 'Post desde el controlador'
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