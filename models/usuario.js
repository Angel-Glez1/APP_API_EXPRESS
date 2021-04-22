const { Schema, model } = require('mongoose');

//*TODO:  Schema de la tabla de usuarios */

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'la contraseña es obligatorio']
    },

    imagen: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    }

});

// Cofig para retornar sola los datos que mi interesan
UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
