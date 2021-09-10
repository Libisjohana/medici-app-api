const IndetificationTypesModel = require('../models/identification_types.model');

// Creamos la constante para exportar las funciones del controlador
const identificationTypesController = {};

/**
 * Método para crear un usuario
 */
identificationTypesController.crearIdentificationType = async (req, res) => {
    // Guardamos el nuevo modelo del usuario
    const newIdentificationType = await new IndetificationTypesModel( req.body );
    newIdentificationType.save();
    res.status(200).json({
        status: 'Ok',
        message: 'Tipo de Identification guardado correctamente',
        detail: 'El Tipo de Identification fué creado correctamente en la base de datos!!'
    });
}

module.exports = identificationTypesController;