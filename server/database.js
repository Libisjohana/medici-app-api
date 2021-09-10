const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URL;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Conectado correctamente")
    })
    .catch((err) => {
        console.log("Error", err);
    });

module.exports = mongoose;