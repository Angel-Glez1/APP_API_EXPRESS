const cors = require('cors');
const express = require('express');


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
        // Middlewares
        this.middlewares();
        // Router
        this.routes();
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

        this.app.use(this.userPath, require('../routers/user'));

    }


    // Puerto
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en ${this.port}`);
        });
    }




}



module.exports = Server;