const { response } = require("express");
/*... Seguridad ...*/
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verifa');


/**... Instacia de mi modelo ...**/
const Usuario = require("../models/usuario");

/*... Login en nuestro Propio  ...*/
const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Exite el uruario Nota: findOne me regresa todo el objeto del usurio encontrado 
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos -Correo' });
        }

        // Si esta activo
        if (!usuario.estado) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos -Estado : false' });

        }

        // Comparar passwords
        const validatePassword = bcryptjs.compareSync(password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos -Password : false' })
        }

        // Generar JWT  
        const token = await generarJWT(usuario.id);


        // Mandar info al frot-end
        res.json({ usuario, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Request fail. Hable con el administrador' });
    }

}

/*... logion de google ...*/
const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        //...Validar el Token generado por google (Sing In);
        const { nombre, correo, img } = await googleVerify(id_token);

        //...Buscar el correo no exita
        let usuario = await Usuario.findOne({ correo });

        //? Validar si exite el usuario en la DDBB. Y si no , entonces lo creamos...
        if (!usuario) {

            //...Create User
            const data = { nombre, correo, password: ':P', img, google: true };

            //...Insert the new user in the database
            usuario = new Usuario(data);

            // TODO... Guardar usuario en la DDBB
            await usuario.save();
        }

        //? Varificar que el usuario no este bloqueado....
        if (!usuario.estado) {
            return res.status(401).json({ msg: 'Su cuenta esta suspendida' });
        }


        //TODO: Generar nuestro token(JWT);
        const token = await generarJWT(usuario.id);

        //TODO Retornar al front-end la info del usuario. 
        res.status(200).json({ usuario, token });

    } catch (error) {

        res.status(401).json({ msg: 'Token google es invalido' });
    }



}


module.exports = {
    login,
    googleSingIn
}