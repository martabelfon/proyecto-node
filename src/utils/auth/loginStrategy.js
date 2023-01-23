const bcrypt = require('bcrypt');
const User = require("../../api/users/user.model");
const { isValidEmail, isValidPassword } = require("./validations");

const LocalStrategy = require("passport-local").Strategy;

const loginStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },

    async (req, email, password, done) => {
        try {
            if (!isValidEmail(email) || !isValidEmail(password)) {
                const error = new Error("Email o contraseña no cumplen con el formato esperado");
                return done(error, null);
            }
            const userDB = await User.findOne({ email });

            const isValidPassword = await bcrypt.compare(password, userDB.password);

            if (!isValidPassword) {
                const error = new Error("Las contraseñas no coinciden. Prueba de nuevo");
                error.status = 400;
                return done(error);
            }

            const userWithoutPassword = userDb.ToObjetc();
            Reflect.deleteProperty(userWithoutPassword, 'password');

            return done(null, userWithoutPassword);
        } catch (error) {
            return done(error, null);
        }
    }
);

module.exports = loginStrategy;