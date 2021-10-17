const {Schema, model} = require("mongoose");

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    img: {
        type: String,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
})


module.exports = model('Usuario', usuarioSchema)