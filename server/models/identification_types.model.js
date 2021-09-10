const mongoose = require('mongoose');
const { Schema } = mongoose;

const identificationTypeSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Identification_Types', identificationTypeSchema);