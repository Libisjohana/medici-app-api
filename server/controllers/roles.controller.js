const rolesModel = require("../models/roles.model");

// Creamos la constante para exportar las funciones del controlador
const rolesController = {};

/**
 * Método para crear un usuario
 */
rolesController.crearRol = async (req, res) => {
    // Guardamos el nuevo modelo del usuario
    const newRol = await new rolesModel( req.body );
    newRol.save();
    res.status(200).json({
        status: 'Ok',
        message: 'Rol guardado correctamente',
        detail: 'El Rol fué creado correctamente en la base de datos!!'
    });
}

module.exports = rolesController;