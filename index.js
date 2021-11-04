const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Mi tienda en express");
});


app.get('/otraRuta', (req, res)=>{
    res.send("Mi otra tienda en express");
});

routerApi(app);

app.listen(port, () =>{
    console.log('Buen día...')
    console.log(`Servidor escuchando en el puerto http://localhost:${ port }`);
});