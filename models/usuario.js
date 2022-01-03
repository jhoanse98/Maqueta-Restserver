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
        default: 'USER_ROLE',
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

usuarioSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid=_id
    return user;
}

module.exports = model('Usuario', usuarioSchema)