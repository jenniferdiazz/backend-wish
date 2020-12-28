const router = require('express').Router();
const Nota = require("../models/nota");



/**
 * @swagger   
 * /api/notanueva: 
 *  post:
 *    summary: add a wish
 *    description: add the title and description from the front end
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */

exports.create = async(req, res) => {
   const body = req.body;
   try{
       const notaDB= await Nota.create(body);
       res.status(200).json(notaDB);

   }catch(error){
       return res.status(500).json({
           mensaje:'Ocurrio un error',
           error
       })

   }
};

/**
 * @swagger   
 * /api/nota: 
 *  get:
 *    summary: see wish list
 *    description: shows all wishes entered
 *    requestBody: 
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              email:
 *                  type: string
 *                  description: email user valid
 *              password:
 *                  type: string
 *                  description: password user valid
 *    responses:
 *      "200":
 *         description: A successful response
 *      "400":
 *         description: A bad request response
 */

exports.notaById = async(req, res)=>{
    const _id = req.params.id;
    try{
        const notaDB = await Nota.findOne({_id});
        res.json(notaDB);

    }catch(error){
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        })

    }
};

//Obtener todas las notas
exports.list= async(req, res)=>{
    
    try{
        const notaDB = await Nota.find();
        res.json(notaDB);

    }catch(error){
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        })

    }
};

//borrar nota (delete) con el _id
exports.remove = async(req, res)=>{
    const _id = req.params.id;
    try{
        const notaDB = await Nota.findByIdAndDelete({_id});
        if(!notaDB){
            return res.status(500).json({
                mensaje:'No se encontro',
                error
            })

        }
        res.json(notaDB);

    }catch(error){
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        })

    }
};

//actualizar un nota mediante el PUT
exports.update = async(req, res)=>{
    const _id = req.params.id;
    const body = req.body;
    try{
        const notaDB = await Nota.findByIdAndUpdate(_id, body, {new:true});
        if(!notaDB){
            return res.status(500).json({
                mensaje:'No se encontro',
                error
            })

        }
        res.json(notaDB);

    }catch(error){
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        })

    }
};


