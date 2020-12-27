
const mongoose = require('mongoose');

const notaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    
    },
    description: {
        type: String,
        
    },
    userId: {
        type: String,
      
    },
    date: {
        type: Date,
        default: Date.now
    },
    active:{
        type: Boolean,
        default:true
    }
});

module.exports = mongoose.model('Nota', notaSchema);