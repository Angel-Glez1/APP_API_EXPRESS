/*===================================================
|           Buscardor flexible
|====================================================
|
|   Ejemplos de como va a funcionar mi buscador
|   
|   {{url}}/api/buscar/productos/donas
|   Va a ir ala coleccion de productos y va a traer todos 
|   registros que  coincidan con donas.
|
*/

const { response } = require("express");
const { buscarUsuarios, buscarCategorias, buscarProductos } = require("../helpers/DDBB_Buscador");
const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];



const buscar = async (req, res = response) => {

    const { coleccion, termino } = req.params;


    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(401).json({ msg: `Las colecciones Permitidas son ${coleccionesPermitidas}` });
    }


    switch (coleccion) {
        // Usuarios...
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        // Categorias...
        case 'categorias':
            buscarCategorias(termino, res);
            break;

        // Productos...
        case 'productos':
            buscarProductos(termino, res);
            break;

        // 
        default:
            res.status(500).json({
                msg: `Un no se ha implementado busqueda para ${coleccion} `
            });
    }

}

const searchProductsByCategory = async (req, res) => {
    




}


module.exports = {
    buscar
}











