const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Nombre del personaje obligatorio"],
        },

        image: {
            type: String,
            required: [true, "Imagen del personaje"],
        },

        species: {
            type: String,
            required: [true, "Especia del personaje obligatoria" ],
            enum: ["Humano", "Medio Gigante", "Hombre Lobo", "Gato", "Duende", "Búho", "Fantasma", "Perro de tres cabezas", 
                    "Dragon", "Centauro", "Elfo Doméstico", "Acromántula", "Hippogriffo", "Gigante", "Vampiro", "Medio Humano"],    
        },

        howartsStudent: {
            type: Boolean,
            required: [true, "Campo obligatorio"],

        },

        howartsStaff: {
            type: Boolean,
            required: [true, "Campo obligatorio"],

        },

        bloodType: {
            type: String,
            required: [true, "Tipo de sangre del personaje"],
        },

        boggart: {
            type: String,
            required: [false, "Tipo de boggart del personaje"],
        },

        patronus: {
            type: String,
            required: [false, "Tipo de patronus del personaje"],
        },

        alive: {
            type: Boolean,
            required: [true, "Indica si el personaje sigue vivo"],
        },



       /**
        * - patronus STRING
        * - alive TRUE/FALSE
        *  */
    },
    {
        timestamps: true,
    }
);

const Character = mongoose.model("characters", characterSchema);

module.exports = Character;