const path = require('path')
const fs = require('fs')

const { response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { subirArchivo } = require("../helpers/subir-archivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const cargarArchivo = async (req, res=response) => {
    try {
        const nombre = await subirArchivo(req.files, ['pdf'])
        res.json({
            nombre
        })
    } catch (error) {
        return res.status(400).json({
            error
        })       
    }
    
}


const actualizarArchivos = async (req, res=response) => {
    const {coleccion, id } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id)
            if(!modelo) {
                return res.status(400).json({
                        msg: `No existe un usuario con este id ${id}`
                });
            }

        break;

        case 'productos':
            
            modelo = await Producto.findById(id)
            if(!modelo) {
                return res.status(400).json({
                        msg: `No existe un producto con este id ${id}`
                });
            }

        break;
    
        default:
            return res.status(500).json({msg:"se me olvidó validar esto"})
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }
    

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre

    await modelo.save();

    res.json(modelo);
}



const mostrarImagen = async (req, res=response) => {
    const {coleccion, id } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id)
            if(!modelo) {
                return res.status(400).json({
                        msg: `No existe un usuario con este id ${id}`
                });
            }

        break;

        case 'productos':
            
            modelo = await Producto.findById(id)
            if(!modelo) {
                return res.status(400).json({
                        msg: `No existe un producto con este id ${id}`
                });
            }

        break;
    
        default:
            return res.status(500).json({msg:"se me olvidó validar esto"})
    }

    if(modelo.img){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
        }
    }
    else {
        const pathPlaceHolder = path.join(__dirname, "../assets", "no-image.jpg")
        return res.sendFile(pathPlaceHolder)
    }

    res.json({msg: "falta placeholder"});
}



const actualizarArchivoCloudinary = async (req, res=response) => {
    const {coleccion, id } = req.params

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            
            modelo = await Usuario.findById(id)
            if(!modelo) {
                return res.status(400).json({
                        msg: `No existe un usuario con este id ${id}`
                });
            }

        break;

        case 'productos':
            
            modelo = await Producto.findById(id)
            if(!modelo) {
                return res.status(400).json({
                        msg: `No existe un producto con este id ${id}`
                });
            }

        break;
    
        default:
            return res.status(500).json({msg:"se me olvidó validar esto"})
    }

    if(modelo.img){
        const nombreArr =  modelo.img.split("/")
        const nombre = nombreArr[nombreArr.length -1]
        const [nombre_id] = nombre.split(".")
        cloudinary.uploader.destroy(nombre_id)
    }
    const { tempFilePath } = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath )
    modelo.img = secure_url;

    await modelo.save()

    res.json(modelo);
}
module.exports={
    cargarArchivo,
    actualizarArchivos,
    mostrarImagen,
    actualizarArchivoCloudinary
}