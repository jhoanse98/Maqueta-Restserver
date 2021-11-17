const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {uid}
        jwt.sign(payload, process.env.PRIVATEKEY,{
            expiresIn: '1h'
        }, (error, token) => {
            if(error){
                console.log(error)
                reject('No se pudo crear el token')
            } else {
                resolve(token)
            }
        })
    })

}

module.exports = {
    generarJWT    
}