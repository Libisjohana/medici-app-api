const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
})

// roleSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Roles', roleSchema);