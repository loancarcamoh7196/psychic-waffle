/**
 * Archivo de Configuracion de Server
 */
const express = require('express');
const routerApi = require('./routes'); // Archivo de Rutas
const { logErrors, errorHandler} = require('./middlewares/error.handler'); // Middleware de Manejo de Errores


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Mi tienda en express");
});


app.get('/otraRuta', (req, res)=>{
    res.send("Mi otra tienda en express");
});

routerApi(app);// Router de server
app.use(logErrors);// Error en consola
app.use(errorHandler); //Error a usuario

app.listen(port, () =>{
    console.log('Buen día...')
    console.log(`Servidor escuchando en el puerto http://localhost:${ port }`);
});