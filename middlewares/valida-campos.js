const { validationResult } = require("express-validator")


const validaCampos = ( req, res, next) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json(errores)
    }

    next()
}

module.exports = {
    validaCampos
}