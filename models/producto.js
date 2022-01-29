const {Schema, model} = require("mongoose");

const productoSchema = Schema({
    nombre: {
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    estado: {
        type: Boolean,
        require: true,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true,
    },
    precio: {
        type: Number,
        default: 0
    },
    descripcion: {type: String},
    disponibilidad: { type: Boolean},
    img: { type: String }
})

module.exports = model("Producto", productoSchema);