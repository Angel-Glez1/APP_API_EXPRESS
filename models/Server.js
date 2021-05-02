const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


/*...  Usar express Con clases  ...*/
class Server {


    // Iniciamos nuestro servidor.
    constructor() {

        // Express
        this.app = express();
        this.port = process.env.PORT;
        this.listen();

        // Paths the my Web Reset
        this.paths = {
            auth:     '/api/auth',
            search :  '/api/buscar',
            category: '/api/categorias',
            products: '/api/productos',
            user:     '/api/usuarios',
            upload:   '/api/upload'
        } 

        // Conectar a la DDBB.
        this.connectDB();

        // Middlewares.
        this.middlewares();

        // Rutas de mi aplicacion.
        this.routes();

    }


    // Connection of the DDBB 
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


        // FileSytem carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    // Routers the Rest Server
    routes() {
        this.app.use(this.paths.auth, require('../routers/authRouter'));
        this.app.use(this.paths.category, require('../routers/categoriaRouter'));
        this.app.use(this.paths.search, require('../routers/buscadorRouter'));
        this.app.use(this.paths.products, require('../routers/productosRouter'));
        this.app.use(this.paths.user, require('../routers/userRouter'));
        this.app.use(this.paths.upload, require('../routers/uploadRouter'));
    }



    // Port donde correo mi aplicacion
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en ${this.port}`);
        });
    }

}



module.exports = Server;