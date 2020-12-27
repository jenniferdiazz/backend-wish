const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Conexión a Base de datos
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1y8z3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
// mongoose.connect(uri,
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false, }
// )
// .then(() => console.log('Base de datos conectada'))
// .catch(e => console.log('error db:', e))

//modern connection
const db = async()=>{
    try{
        const success=await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            //se utilizan todod los metodos de cosulta nativos
            useFindAndModify:false,
        });
        console.log('DB connected');
    }
    catch(error){
        console.log('DB Connection Error', error);

    }
}
//execute db connection
db(); 

// import routes
const authRoutes = require('./routes/auth')
const validaToken = require('./routes/validate-token');
const admin = require('./routes/admin');
const notanueva = require('./routes/nota');
const user = require('./routes/user');

// route middlewares
//midlewares es una funcion que se ejecuta antes de devolver en este caso o un mensaje, puede ser una validacion para que no se ejecute el archivo
app.use('/api/user', authRoutes)
app.use('/api/admin', validaToken, admin)
// app.get('/', (req, res) => {
//     res.json({
//         estado: true,
//         mensaje: 'funciona!'
//     })
// });
app.use('/api', notanueva);
app.use('/api', user);
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})