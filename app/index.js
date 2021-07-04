const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();


const usuarioRouter = require('../routers/usuario.router.js');


app.use(bodyParser.json());


app.listen(PORT, ()=> console.log(`Servidor ejecutandose en el puerto ${PORT}`));


//Configuraciones
app.use(cors());


//routers
app.get('/',(req, res)=> {
    res.status(200).json({"msj":"Bienvenido al API"})
} )

//routers de API
app.use('/api/usuario', usuarioRouter );