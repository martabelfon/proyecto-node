const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
    {
        houseName: {
            type: String,
            require: [true, "Debes poner el nombre de la casa"],
        },

        houseImage: {
            type: String,
            required: [true, "Imagen del escudo de la casa"],
        },

        founder: {
            type: String,
            require: [true, "Debes poner el nombre del fundador"],
        },

        houseColor: {
            type: String,
            require: [true, "Colores que tiene esta casa"],
        },

        houseAnimal: {
            type: String,
            require: [true, "Animal de la casa"],
        },

        houseFeatures: {
            type: String,
            require: [true, "Rasgos de la casa"],
        },

        houseGhost: {
            type: String,
            require: [true, "Fantasma de la casa"],
        },

        commonRoom: {
            type: String,
            require: [true, "Sala común de la casa"],
        },

        commonRoomGuardedBy: {
            type: String,
            require: [false, "Quien custodia la sala común de esta casa"],
        },

    },
    {
        timestamps: true,
    }
);

const locationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        loot: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const House = mongoose.model("houses", houseSchema);

module.exports = House;


