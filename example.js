/**
 * Como subir archivos con node...
 * Este es un ejemplo de como subir images a nuestri servidor pero este no es muy recomendado 
 * si no mas bien lo que tenem os que hacer que subir mis imaganes en un servidor aparte
 * para mantener la integridad de mi codigo fuente
 */

const { subirArchivo } = require("./helpers");


const cargarArchivos = async (req = request, res = response) => {

    try {

        const nombre = await subirArchivo(req.files);
        res.json(nombre);

    } catch (error) {

        console.log('Mi error', error);
        res.status(500).json(error);
    }

}


const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el ID : ${id}` });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el ID : ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se ve olvido hacer esto ' });
    }

    // Limpiar imágenes previas.
    if (modelo.img) {
        // Borrar imágen del servidor.
        const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg)
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);

}


const mostarImg = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el ID : ${id}` });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el ID : ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se ve olvido hacer esto ' });
    }

    // Servir la imagen si exite... 
    if (modelo.img) {
        // Buscar la imagen en el server...
        const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    // Error por que el registro no tiene imagen
    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);
}
