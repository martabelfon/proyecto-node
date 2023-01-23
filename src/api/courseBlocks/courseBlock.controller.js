const CourseBlock = require("./courseBlock.model");

const indexGet = async (req, res, next) => {
    try {
        /**
         * Lo que va dentro de .populate() es el nombre del campo en el modelo
         * que contiene la ID del elemento de otra colección que queremos obtener.
         */
        const allCourseBlocks = await CourseBlock.find().populate('character').populate('house');
        return res.status(200).json(allCourseBlocks);
    }
    catch (error) {
        return next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        const courseBlockToBeCreated = new CourseBlock(req.body);
        
        const created = await courseBlockToBeCreated.save();

        return res.status(201).json(created);
    } catch(error) {
        return next(error);
    }
}
module.exports = {
    indexGet,
    createPost,
};