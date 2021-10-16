const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        })

        console.log("Conectado satisfactoriamente")
    } catch (error) {
        console.log(error)
        throw new Error("Ha habido un problema en la conexión")
    }
}

module.exports = {
    conectarDB
}