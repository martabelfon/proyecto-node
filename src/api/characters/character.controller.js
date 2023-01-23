const Character = require("./character.model");

const indexGet = async (req, res, next) => {
    try {
        const characters = await Character.find();
        return res.status(200).json(characters );
    } catch (error){
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await Character.findById(id);
        return res.status(200).json(found);
    } catch (error){
        return next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        console.log(req.body);
        const characterToBeCreated = new Character(req.body); //! NO SE QUE HACE
        const created = await characterToBeCreated.save();
        return res.status(201).json(created);
    } catch (error){
        return next(error);
    }
};

const editPut = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fields = {...req.body}; //! NO SE QUE HACE
        const options = { new: true }; //! NO SE QUE HACE
        console.log('fields en character', options); 
        const edited = await Character.findByIdAndUpdate(id, fields, options); 
        return res.status(200).json(edited);
    } catch (error) {
        return next(error);
    }
};

const deleteCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Character.deleteOne({ _id: id });
        if (deleted.deletedCount) {
            return res.status(200).json("Elemento eliminado con éxito");
        } else {
            return res.status(200).json("No se encuentra el elemento para eliminar");
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    indexGet,
    getById,
    createPost,
    editPut,
    deleteCharacter,
}