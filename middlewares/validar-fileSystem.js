

const validarArchivo =  async (req, res, next) => {

    // Valida que el la req exta la imagen...
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'No hay archivos en la peticion - archivo'
        });
        
    }

    next();
}


module.exports = {
    validarArchivo
}