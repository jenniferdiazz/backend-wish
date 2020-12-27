//generic imports
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()



// import routes
const authRoutes = require('./routes/auth')
const validaToken = require('./routes/validate-token');
const admin = require('./routes/admin');
const nota = require('./routes/nota');
const user = require('./routes/user');

//app-express
const app = express();

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

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


// middlewares
app.use(cors(corsOptions));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());






// routes middlewares
app.use('/api/user', authRoutes)
app.use('/api/admin', validaToken, admin)
app.use('/api', nota);
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