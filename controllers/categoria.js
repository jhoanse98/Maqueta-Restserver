const { response } = require("express");
const  Categoria  = require("../models/categoria");


//Obtener todas las categorias paginadas y populate
const obtenerCategoriasPaginadas = async (req, res=response) => {
    const {limite = 10, desde=0} = req.query

    const query={estado:true}

    const [total, categorias] = await Promise.all([
        Categoria.count(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario')
    ])

    res.json({
        total,
        categorias
    })
}

//Obtener categoria por id

const obtenerCategoriaId = async (req, res=response) => {

    const {id} = req.params
    const categoria = await Categoria.findById(id)
    return res.json({
        categoria
    })

}

//Crear categoria
const crearCategoria = async (req, res=response) => {
        const nombre = req.body.nombre.toUpperCase();
        const categoriaDB = await Categoria.findOne({nombre})

        if(categoriaDB){
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe en la BD`
            })
        }

        //Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = await new Categoria(data);

        await categoria.save()

        return res.json(categoria)
}

//Actualizar categoria

const actualizarCategoria = async (req, res=response) => {
    const {id} = req.params
    const {estado, usuario, ...resto} = req.body
    resto.nombre=resto.nombre.toUpperCase()
    resto.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id, resto, {new: true})
    res.json({
        categoria
    })
}

//Eliminar categoria
const eliminarCategoria = async (req, res=response) => {
    const {id} = req.params
    const categoriaBorrar = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json({
        id,
        categoriaBorrar
    })

}

module.exports={
    obtenerCategoriasPaginadas,
    obtenerCategoriaId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
}



