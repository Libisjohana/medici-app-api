const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const Roles = require('./roles.model');
const Identification_Types = require('./identification_types.model');

const usuarioSchema = new Schema({
    rol: {
        type: Schema.Types.ObjectId,
        ref: 'Roles'
    },
    nid: {
        type: String,
    },
    nombres: {
        type: String,
    },
    apellidos: {
        type: String
    },
    nacimiento: {
        type: String,
    },
    correo: {
        type: String,
    },
    contrasena: {
        type: String,
    },
    telefono: {
        type: Number
    },
})

// usuarioSchema.plugin(require('mongoose-autopopulate'));

usuarioSchema.methods.encryptPassword = (contrasena) => {
    return bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10));
}

usuarioSchema.methods.validarPassword = function(contrasena) {
    return bcrypt.compareSync(contrasena, this.contrasena);
}


module.exports = mongoose.model('Usuarios', usuarioSchema);