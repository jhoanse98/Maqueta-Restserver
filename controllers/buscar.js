const { response } = require("express")
const {ObjectId} = require("mongoose").Types

const Usuario = require("../models/usuario")
const Categoria = require("../models/categoria")
const Producto = require("../models/producto")

const coleccionesPermitidas = [
    "categorias",
    "productos",
    "roles",
    "usuarios",
]

//buscador de usuarios
const buscarUsuario = async (termino, res=response) => {

    const mongoID = ObjectId.isValid(termino)
    if(mongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, "i"); //Expresion regular para que no sea case sensitive
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {email: regex}],
        $and: [{estado: true}]
    })
    res.json({
        results: usuarios
    })
}

const buscarProductos = async (termino, res=response) => {

    const mongoID = ObjectId.isValid(termino)
    if(mongoID){
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, "i"); //Expresion regular para que no sea case sensitive
    const productos = await Producto.find({nombre:regex, estado:true})
        .populate('categoria','nombre')

    res.json({
        results: productos
    })
}


//buscador de categoria
const buscarCategoria = async (termino, res=response) => {

    const mongoID = ObjectId.isValid(termino)
    if(mongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, "i"); //Expresion regular para que no sea case sensitive
    const categorias = await Categoria.find({nombre:regex, estado:true})
    res.json({
        results: categorias
    })
}


const buscar = (req, res=response) => {

    const {coleccion, termino} = req.params
    

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg: `las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case "usuarios":
            buscarUsuario(termino, res)
            break;

        case "productos":
            buscarProductos(termino, res)
            break;
        case "categorias":
            buscarCategoria(termino, res)
            break;      
    
        default:
            break;
    }

    

}

module.exports={
    buscar
}