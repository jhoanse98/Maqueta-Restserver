const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const {conectarDB} = require("../database/config")

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

        //Conexión a la base de datos de mongo
        this.conexionDB()

        //lectura y parseo del body
        this.app.use(express.json());


        //servir el sitio estatico
        this.app.use(express.static('public'));


        //fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));
    }

    async conexionDB(){
        await conectarDB()
    }

    routes(){
        this.app.use('/api/auth', require('../routes/auth'))
        this.app.use('/api/buscar', require("../routes/buscar"))
        this.app.use('/api/categorias', require('../routes/categorias'))
        this.app.use('/api/uploads', require('../routes/uploads'))
        this.app.use('/api/usuarios', require('../routes/user'))
        this.app.use('/api/productos', require('../routes/productos'))

        
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log("Servidor corriendo en puerto ", process.env.PORT)
        })
    }
}

module.exports = Server;