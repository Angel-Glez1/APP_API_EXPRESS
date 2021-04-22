const mongoose = require('mongoose');

/*

    Hacer la conecxion ala base de datos...

*/ 


const dbConnection = async () => {


    const url = 'mongodb://localhost:27017/node_cafe';

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify : false
        });

        console.log('Connection success DDBB online');

        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar el proceso la base de datos');

    }

}


module.exports = {
    dbConnection
}
