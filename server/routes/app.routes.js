const express = require('express');
const AppRouter = express.Router();
// const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const rolesController = require('../controllers/roles.controller');
const identificationTypesController = require('../controllers/identification_types.controller');
const authController = require('../controllers/auth.controller');

// ================================================
//  Ruta para el login
AppRouter.post('/auth/login', authController.login);
// ================================================


// ================================================
//  Rutas para la gestión de Usuarios
AppRouter.post('/users/register', usersController.crearUsuario);
AppRouter.post('/users/register/from_admin', usersController.crearUsuarioFromAdmin);
AppRouter.post('/users/edit/:id', usersController.editUser);
AppRouter.get('/users/all', usersController.getAllUsers);
// ================================================

// ================================================
//  Rutas para la gestión de los Roles
AppRouter.post('/roles/add', rolesController.crearRol);
// ================================================


// ================================================
//  Rutas para la gestión de los tipos de identificacion
AppRouter.post('/identificationtypes/add', identificationTypesController.crearIdentificationType);
// ================================================

module.exports = AppRouter;