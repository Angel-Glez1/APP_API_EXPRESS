/*
|=====================================================
|       Productos
|=====================================================
|   
|   This controllers have five end post
|   
|   GET    :: ALL Products - Pagination - Populate - Public
|   GET    :: A Product - Populate - Public
|   POST   :: Create a Productos with relacition a the documents the Usuarios and Categories. - Private (Token)
|   PUT    :: Create a Productos with relacition a the documents the Usuarios and Categories. - Private (Token)
|   DELETE :: Create a Productos with relacition a the documents the Usuarios and Categories. - Private (Admin)
*/
const { response } = require("express");
const Producto = require("../models/producto");


// TODO::Get-All
const getProductos = async (req, res = response) => {
    
    // Obtener query Params para mi paginacion.
    const { limit = 10, desde = 0 } = req.query;

    // Condicion para la consulta.
    const condicional = { estado: true };
    
    // Saber el total de registro y mostar todos los usurios
    const querys = [
        Producto.countDocuments(condicional),
        Producto.find(condicional)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limit))        
    ];

    const [total_reg, productos] = await Promise.all(querys);
    res.status(200).json({ total_reg, productos });
}


// TODO:: GET ID
const getProducto = async ( req , res ) => {
    
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    
    res.status(200).json(producto);

}


// TODO::POST 
const createProduct = async (req, res = response) => {

    // Filtar  el body
    const { estado, usuario, _id,  ...body} = req.body;
    body.usuario = req.usuario._id;

    // Validar que no exita dos productos con el mismo nombre.
    const exiteProducto = await Producto.findOne({ nombre : body.nombre });
    if (exiteProducto) {
        return res.status(400).json({ msg: `Ya exite un producto con el nombre de: ${body.nombre}` });
    }

    // Preparar data y guardar data.
    const producto = await new Producto(body);
    producto.save();

    

    // Retornar el producto creado
    res.status(401).json(producto);

}


// TODO::PUT 
const putProductos = async(req, res = response) => {
    
    
    const { id } = req.params;


    const { estado , usuario, ...data} = req.body;
    data.usuario = req.usuario._id;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    const ProductoActualizado = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(ProductoActualizado);

    

}


// TODO::DELETE
const deleteProducto = async (req, res = response) => {
    
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);

}



module.exports = {
    deleteProducto,
    createProduct,
    getProductos,
    getProducto,
    putProductos

}