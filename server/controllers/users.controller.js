const { ObjectId, ObjectID } = require("mongodb");
const usersModel = require("../models/users.model");
const nodemailer = require('nodemailer');
const generator = require('generate-password');
const pug = require('pug');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_CORP,
        pass: process.env.PASSWORD_EMAIL_CORP
    }
})


// Creamos la constante para exportar las funciones del controlador
const usersController = {};

/**
 * Método para crear un usuario
 */
usersController.crearUsuario = async (req, res) => {
    const { correo, nid } = req.body;
    // Validamos si existe un usuario con el mismo CC
    const userFindCC = await usersModel.findOne({ nid: nid });
    if(userFindCC){
        res.status(404).json({
            estado: 'Ok',
            mensaje: 'NID ya existe!!',
            detalle: 'Ya existe un usuario con este NID registrado!!',
        });
        return;
    }

    // Validamos si existe un usuario con el mismo CC
    const userFindEmail = await usersModel.findOne({ correo: correo });
    if(userFindEmail){
        res.status(404).json({
            estado: 'Ok',
            mensaje: 'Correo ya existe!!',
            detalle: 'Ya existe un usuario con este Correo registrado!!',
        });
        return;
    }

    // Guardamos el nuevo modelo del usuario
    const newUser = await new usersModel( req.body );

    newUser.contrasena = await newUser.encryptPassword(req.body.contrasena);

    newUser.save();
    res.status(200).json({
        estado: 'Ok',
        mensaje: 'Usuario guardado correctamente',
        detalle: 'El usuario fué creado correctamente en la base de datos!!',
        usuario: newUser
    });
}

/**
 * Método para crear un usuario
 */
usersController.crearUsuarioFromAdmin = async (req, res) => {
    const { email } = req.body;

    // Validamos si existe un usuario con el mismo CC
    const userFindEmail = await usersModel.findOne({ email: email });
    if(userFindEmail){
        res.status(200).json({
            status: 'Ok',
            message: 'Correo ya existe!!',
            detail: 'Ya existe un usuario con este Correo registrado!!',
        });
    }

    // Guardamos el nuevo modelo del usuario
    const newUser = await new usersModel( req.body );
    const password = generator.generate({
        length: 12,
        uppercase: true,
        lowercase: true,
        numbers: true,
    })
    newUser.password = await newUser.encryptPassword(password);

    // Creamos el transporter para enviar el mail
    const template = pug.renderFile('server/views/mail.pug');
    transporter.sendMail(
        {
            from: process.env.EMAIL_CORP,
            to: newUser.email,
            subject: 'Registro Exitoso!!',
            html: template
        },
        (error, info) => {
            if(error){
                console.error(error);
            } else {
                console.log(info);
            }
        }
    )
    
    // newUser.save();
    res.status(200).json({
        status: 'Ok',
        message: 'Usuario guardado correctamente',
        detail: 'El usuario fué creado correctamente en la base de datos!!',
    });
}

usersController.getAllUsers = async (req, res) => {

    const users = await usersModel.find({})
        .select('-_id -__v -password')
        .populate('rol', '-_id -__v')  
        .populate('tipoId', '-_id -__v');  

    res.json(users);
}

usersController.editUser = async ( req, res ) => {
    
    const usuarioEditado = await new usersModel( req.body );
    await usersModel.updateOne({ "_id": ObjectID(req.params.id) }, { $set: usuarioEditado });

    res.status(200).json({  
        status: 'Ok',
        message: 'Usuario editado correctamente',
        detail: 'El usuario fué editado correctamente!!',
    })
    
}

module.exports = usersController;