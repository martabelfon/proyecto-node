const passport = require("passport");

const registerPost = (req, res, next) => {
    try {
        const done = (error, user) => {
            console.log('EJECUTAMOS DONE"')
            if (error) return next(error);
            return res.status(200).json(user);
        };

        passport.authenticate('registro', done)(req);
    } catch (error) {
        return next(error);
    }
};

const loginPost = (req, res, next) => {
    try {
        const done = (error, user) => {
            console.log('EJECUTAMOS DONE"')
            if (error) return next(error);
            return res.status(200).json(user);
        };

        passport.authenticate('login', done)(req);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    registerPost,
    loginPost,
};