const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>{
    res.send("Mi tienda en express");
});


app.get('/otraRuta', (req, res)=>{
    res.send("Mi otra tienda en express");
});

app.get('/products', (req, res) => {
    res.json([{
            name: 'Laptop Gamer',
            price: 23000,
        },
        {
            name: 'iPhone X3',
            price: 32000,
        }
    ]);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        name: 'iPhone X3',
        price: 32000,
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json();
});

app.post('/products', (req, res) => {

    res.json();
});

app.post('/products/:id', (req, res) => {

    res.json();
});

app.delete('/products/:id', (req, res) => {

    res.json();
});


app.get('/categories/:id/products', (req, res) => {
    const { id } = req.params;
    res.json();
});


app.get('/categories', (req, res) => {

    res.json();
});

app.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    res.json();
});

app.listen(port, () =>{
    console.log(`Servidor escuchando en el puerto ${port}`);
});