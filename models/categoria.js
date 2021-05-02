const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({

    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: true },
    estado: { type: Boolean, default: true, required: true },

    //TODO: Relacionar Collentions en mongodb..
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }

});


// Cofig para retornar sola los datos que mi interesan
CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categorias } = this.toObject();
    
    return categorias;
}

module.exports = model('Categoria', CategoriaSchema);