const { Schema, model } = require('mongoose');


const ProductoShema = Schema({

    /*.... Campos con referencia a otras colecciones  ...*/
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },

    /*... Documentos Normales ...*/ 
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    img: {
        type: String
    }

});


// Configuracion de los retorns de datos
ProductoShema.methods.toJSON = function () {

    const { __v, password, _id, ...producto } = this.toObject();
    producto.id = _id;
    return producto;

}


module.exports = model('Producto', ProductoShema);
