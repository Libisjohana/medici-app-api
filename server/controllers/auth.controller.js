const { ObjectID } = require('mongodb');
const usersModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Creamos la constante para exportar las funciones o métodos
const authController = {};

authController.login = async(req, res) => {
    if(req.body.correo !== "" && req.body.contrasena !== "") {
        const { correo, contrasena } = req.body;
        // Validamos si existe un usuario con el mismo correo
        const userFindEmail = await usersModel.findOne({ correo: correo })
                            .select('-_id -__v -password')
                            .populate('rol', '-_id -__v')  
                            .populate('tipoId', '-_id -__v');
        if(!userFindEmail){
            res.status(404).json({
                estado: 'fail',
                mensaje: 'Correo no existe!!',
                detalle: 'No existe un usuario con este Correo registrado!!',
            });
        }

        if(!userFindEmail.validarPassword(contrasena)){
            res.status(404).json({
                estado: 'fail',
                mensaje: 'Contraseña incorrecta',
                detalle: 'La contraseña ingresada es incorrecta',
            });
        }
        const payload = {
            check:  true
        };
        const token = jwt.sign(payload, process.env.CLAVE_JWT, {
            expiresIn: 1440
        });
        res.status(200).json({
            estado: 'ok',
            mensaje: 'Login correcto',
            detalle: 'Usted ah iniciado sesion correctamente',
            token: token,
            usuario: userFindEmail
        });
    }
}

// authController.logout = async(req, res, next) => {
//     req.session.destroy();
//     req.logout();
//     res.json({
//         status: 1,
//         message: "Sesión cerrada"
//     })
// }

module.exports = authController;