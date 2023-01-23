const House = require("./house.model");

const indexGet = async (req, res, next) => {
    try {
        const houses = await House.find();
        return res.status(200).json(houses);
    } catch (error){
        return next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const found = await House.findById(id);
        return res.status(200).json(found); 
    } catch (error) {
        return next(error);
    }
};

const createPost = async (req, res, next) => {
    try {
        console.log(req.body);

        const houseToBeCreated = new House(req.body);

        const created = await houseToBeCreated.save();

        return res.status(201).json(created);
    } catch (error) {
        return next(error);
        
    }
};

const editPut = async(req, res, next) => {
    try {
        const { id } = req.params;
        const fields = {...req.body};
        const options = { new: true };
        console.log('fields en house', options);
        const edited = await House.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited);
    } catch (error) {
        return next(error);
    }
};

const deleteHouse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await House.deleteOne({ _id: id });
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
    deleteHouse,
}