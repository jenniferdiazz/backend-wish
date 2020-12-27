const router = require('express').Router();
const User = require("../models/User");
//para encriptar contraseña
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// validation
const Joi = require('@hapi/joi');


const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
})

router.post('/login', async(req,res)=>{
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error:true, mensaje: 'Usuario no encontrado' });

    const passValida = await bcrypt.compare(req.body.password, user.password);
    if (!passValida) return res.status(400).json({ error:true, mensaje: 'contraseña no válida' })
    
    //configurar jwt
    const token = jwt.sign({
        //esto es el payloand
        name: user.name,
        id : user._id
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        data:{token}
    })
    
    // res.json({
    //     error: null,
    //     mensaje: 'exito bienvenido',
    //     token
    // })

})

//post envia una peticion a nuestro servidor...crea
router.post('/register', async (req, res) => {

    //validaciones de usuario
    const {error} = schemaRegister.validate(req.body)
    if (error){
        return res.status(400).json({error: error.details[0].message})

    }
    //validar emailunico
    //busca un documento en la bd
    const existeEmail = await User.findOne({email: req.body.email})
    if(existeEmail) return res.status(400).json({error:true, mensaje:'email ya registrado'})

    //encriptar contraseña
    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,saltos)
    

    //generar un nuevo usuario de la bd...re body es info del fromt
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:password
    })
    try{
        //esperate que el usuario se guarde en la bd
        //userdb tendra la resp de la bd
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })

    }catch(error){
        res.status(400).json(error)

    }

    
})

module.exports = router;