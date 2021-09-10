// const passport = require('passport');
// const { param } = require('../../routes/app.routes');
// const localStrategy = require('passport-local').Strategy;
// const authModel = require('../../models/auth.model');

// passport.serializeUser((usuario, done) => {
//     done(null, usuario.id);
// })

// passport.deserializeUser(async(id, done) => {
//     const usuario = await authModel.findById(id);
//     done(null, usuario);
// })

// passport.use('local-registro', new localStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     async(req, email, password, done) => {

//         const existe = await authModel.findOne({ email: email });

//         if (!existe) {
//             const newUsuario = new authModel(req.body);

//             newUsuario.email = email;
//             newUsuario.password = newUsuario.encryptPassword(password);

//             await newUsuario.save();

//             done(null, newUsuario);
//         } else {
//             return done(null, false, req.flash('messageError', 'Este email ya existe'));
//         }
//     }
// ));

// passport.use('local-login', new localStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     async(req, email, password, done) => {
//         const usuario = await authModel.findOne({ email: email });

//         if (!usuario) {
//             return done(null, false, req.flash('loginMessage', 'Email no registrado'))
//         }

//         if (!usuario.validarPassword(password)) {
//             return done(null, false, req.flash('loginMessage', 'Contraseña Incorrecta'))
//         }

//         done(null, usuario);
//     }
// ))