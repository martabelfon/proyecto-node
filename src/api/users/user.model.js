const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: [true, "Debes introducir el email"],
            unique: true,
        },

        password: {
            type: String,
            require: [true, "Debes introducir la contraseña"],
        },

        name: {
            type: String,
        },
    },
    {
        timestamps:true,
    }
);

const User = mongoose.model('users', userSchema);

module.exports = User;