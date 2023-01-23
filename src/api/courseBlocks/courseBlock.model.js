const mongoose = require('mongoose');

const courseBlockSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes especificar un nombre para el bloque"],
            unique: true,
        },

        description: {
            type: String,
        },

        /**
         * Aquí guardaremos una ID, que haga referencia a un elemento creado
         * en otra colección (o modelo), pero guardaremos únicamente la ID.
         */
        character: {
            type: mongoose.Types.ObjectId,
            ref: "characters",
        },

        house: {
            type: mongoose.Types.ObjectId,
            ref: "houses",
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Cuando creamos una colección en base de datos con palabras
 * compuestas, suele usarse guiones bajos.
 */
const CourseBlock = mongoose.model('course_blocks', courseBlockSchema);

module.exports = CourseBlock;