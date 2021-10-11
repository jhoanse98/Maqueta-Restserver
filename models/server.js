const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express()

        //mis middlewares
        this.middleware()

        //mis rutas
        this.routes()
    }


    middleware(){
        //CORS para evitar el error cross domain 
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());


        //servir el sitio estatico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/user'))
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en puerto ", process.env.PORT)
        })
    }
}

module.exports = Server;