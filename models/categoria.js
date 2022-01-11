const {Schema, model} = require("mongoose");


const categoriaSchema = Schema({
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
    }
})

module.exports = model("Categoria", categoriaSchema);