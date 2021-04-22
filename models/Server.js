const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');


/*...  Usar express Con clases  ...*/
class Server {


    // Iniciamos nuestro servidor.
    constructor() {

        // Express
        this.app = express();
        this.port = process.env.PORT;
        this.listen();

        // Enpoints de mi api
        this.userPath = '/api/usuarios';

        // Conectar ala db
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Router
        this.routes();

        
    }



    async connectDB() {
        await dbConnection();
    }

    // Middlewares
    middlewares() {
        // CORS
        this.app.use(cors());

        // Carpeta Public.
        this.app.use(express.static('public'));

        // Lectura y parseo del body(ejem => datos de un formulario).
        this.app.use(express.json());


    }

    // Router de la API REST
    routes() {

        this.app.use(this.userPath, require('../routers/userRouter'));

    }


    // Puerto
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en ${this.port}`);
        });
    }




}



module.exports = Server;