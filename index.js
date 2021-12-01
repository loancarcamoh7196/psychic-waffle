/**
 * Archivo de Configuracion de Server
 */
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes'); // Archivo de Rutas
const { logErrors, errorHandler, ormErrorHandler,boomErrorHandler} = require('./middlewares/error.handler'); // Middleware de Manejo de Errores

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //Permite el envio de peticion tipo JSON 

// Whitlist de acceso a api, tener en cuenta 
const whitelist = [
    'http://localhost:8080',
    'https://myapp.com',
    'http://127.0.0.1:5500',
    'http://localhost:5500'
];

//configuracion de aceso CORS
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else callback(new Error('NO permitido'))
    }

    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/'
};

app.use(cors(options)); // Obliga a toda la app a usar CORS


routerApi(app);// Router de server


app.use(logErrors);// Error en consola
app.use(ormErrorHandler); // Errores de lib sequelize
app.use(boomErrorHandler); // Error tipo boom
app.use(errorHandler);



app.listen(port, () => {
    console.log('Buen día...')
    console.log(`Servidor escuchando en el puerto http://localhost:${ port } \n`);
});