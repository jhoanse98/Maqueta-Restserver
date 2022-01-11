const { response } = require("express");
const Categoria = require("../models/categoria");
const Producto  = require("../models/producto");


//Obtener productos paginados

const obtenerProductos = async (req, res=response) => {

    const {limite=5, desde=0} = req.query

    const [total, productos]  = await Promise.all([
        Producto.count({estado:true}),
        Producto.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.json({
        total,
        productos
    })
}

//Obtener producto por ID
const obtenerProductosPorId = async (req, res=response) => {
    const {id} = req.params
    const productoDB = await Producto.findById(id)
                                .populate('usuario', 'nombre')
                                .populate('categoria', 'nombre')
    res.json({
        productoDB
    })
}

//Crear producto

const crearProducto = async (req, res= response) => {
    const {nombre, precio, descripcion, disponibilidad, categoria} = req.body
   /*
    const categoriaDB = await Categoria.findOne({nombre:categoria})

    const productoBD = await Producto.findOne({nombre})
    */

    const [categoriaDB, productoBD] = await Promise.all([
        Categoria.findOne({nombre:categoria}),
        Producto.findOne({nombre})
    ])

    if(productoBD){
        return res.status(400).json({
            msg:`El producto ${nombre} ya existe en la BD`
        })
    }

    if(!categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoria} no existe en la BD`
        })
    }

    const data = {
        categoria: categoriaDB._id,
        descripcion,
        disponibilidad,
        nombre: nombre.toUpperCase(),
        precio,
        usuario: req.usuario._id
    }

    const productoNuevo = await new Producto(data)

    await productoNuevo.save()

    res.json({
        productoNuevo,
    })

}

//actualizar producto
const actualizarProducto = async (req, res=response) => {
    const {id} = req.params
    const {usuario, estado, ...data} = req.body

    if(data.nombre){
        data.nombre=data.nombre.toUpperCase()
    }

    data.usuario= req.usuario._id

    if(data.categoria){

        const categoriaDB = await Categoria.findOne({nombre:data.categoria})

        if(!categoriaDB){
            return res.status(400).json({
                msg: `La categoria no existe en la BD`
            })
        }
        data.categoria = categoriaDB._id
    }


    const productoActualizado = await Producto.findByIdAndUpdate(id, data, {new:true})
    res.json({
        productoActualizado
    })
}

//Borrar producto

const eliminarProducto = async (req, res=response) =>{
    const {id} = req.params
    const productoEliminado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})
    res.json({
        productoEliminado
    })
}

module.exports={
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProductos,
    obtenerProductosPorId,
}