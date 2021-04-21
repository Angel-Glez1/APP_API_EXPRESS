const { response } = require('express');


const UsuariosGet = (req, res = response) => {

    // Obtener querys params de la url
    // Los querys params serian algo asi ( ? apikey & limit= 10 )
    const { token, limit = 10, pag = 1,  es } = req.query;

    res.json({ msg: "api Get Controller", token, limit, es });
}


const UsuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;


    res.json({ msg: "api post Controller", nombre , edad });
}

const UsuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({ msg: "api Put Controller", id });
}

const UsuariosDelete = (req, res = response) => {
    res.json({ msg: "api Delete Controller" });
}

module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}