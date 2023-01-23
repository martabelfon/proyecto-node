//express >> caja de herramientas para node
const express = require ("express"); //busca la carpeta node modules en la libreria express i la saca a la variable
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const auth = require('./src/utils/auth/index');
auth.activarAutenticacion();
const { isAuth } = require("./src/utils/auth/middlewares/authMidelwares");

const db = require("./src/utils/db");
db.connectDB();

//*RUTAS IMPORTS
const usersRoutes = require('./src/api/users/user.routes');
const charactersRoutes = require('./src/api/characters/character.routes');
const housesRoutes = require('./src/api/houses/house.routes');
const courseBlocksRoutes = require('./src/api/courseBlocks/courseBlock.routes');
const indexRoutes = require("./src/api/index/index.routes");

// const { Server } = require("http");

const PORT = 3000;

const server = express(); //invocamos a express

//ADMITIR PETICIONES DESDE OTRO SERVIDOR, FRONT O APP
server.use(cors());

//*CONTROL SESIONES DE LOS USUARIOS ACTIVOS
server.use(
    session ({
        secret:process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: { maxAge: 5 * 60 * 1000 },
        store: MongoStore.create({ mongoUrl: db.DB_URL }),
    })
);

//CONVIERTE CUANDO ENVIAMOS POST CON JSON AL SERVIDOR
server.use(express.json());

//CONVIERTE CUANDO MANDAMOS FORM O FORMDATA AL SERVIDOR
server.use(express.urlencoded({ extended: true }));

//* AUTENTICACIÓN
server.use(passport.initialize());
server.use(passport.session());

//*RUTAS SERVIDOR
server.use('/users', usersRoutes);
server.use('/characters', charactersRoutes);
server.use('/houses', housesRoutes);
server.use("/course-blocks", courseBlocksRoutes);
server.use('/', indexRoutes);

/**
* Request >> contiene toda la inforación de la petición que ENTRA DEL FRONT
* Result >> contiene el resultado que le daremos al FRONT
* POR AQUÍ PASARAN TODAS LAS RUTAS QUE NO EXISTAN
* SI NO HACEN MARCH EN LAS RUTAS PREVIAS, LLEGARÁN AQUÍ Y HARÁN MATCH CON ASTERISCO(TODO ENTRA!)
*/
server.use('*', (req, res, next) => {
    return res.status(404).json("No se encuentra la URL. Prueba con otra URL");
});

//*CONTROLADOR ERRORES
server.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Unexpected Error!';
    return res.status(status).json(message);
});


server.listen(PORT, () => { //activar el servidor
    console.log(`Servidor ejercutado a maxima potencia en http://localhost:` + PORT)
});



/**
 * //* HARRY POTTER
 * 
 * - .gitignore
 * - package.json
 * - index.js
 * - /src
 *      - /api
 *          - characters
 *              - name STRING
 *              - species STRING
 *              - howartsStudent TRUE/FALSE
 *              - howartsStaff TRUE/FALSE
 *                      - teachers (Albus Dumbledore (transformaciones), Minerva McGonagall (transformaciones), Severus Snape (Pociones)... )
 *                      - alumnos  (Harry Potter, Ronald Weasley, Hermione Granger, Neville Longbottom...)
 *              - ancestry (ascendencia/tipo de sangre)    STRING
 *              - boggart STRING
 *              - patronus STRING
 *              - alive TRUE/FALSE
 * 
 *          - houses (Gryffindor, Ravenclaws, Slytherins, Hufflepufs)
 *                 GRYFFINDOR:
 *                     - fundador >> Godric Gryffindor
 *                     - colores de la casa >> Escarlata y Dorado
 *                     - animal >> Leon
 *                     - rasgos  >> Valor y Caballerosidad
 *                     - fantasma >> Sir Nicholas de Mimsy-Porpington
 *                     - sala común >> Torre de Gryffindor
 *                     - sala común custiodada por >> Retrato de la Dama Gorda
 *                 RAVENCLAWS:
 *                     - fundador >> 
 *                     - colores de la casa >> 
 *                     - animal >> 
 *                     - rasgos  >> 
 *                     - fantasma >> 
 *                     - sala común >> 
 *                     - sala común custiodada por >> 
 *                 RAVENCLAWS:
 *                     - fundador >> 
 *                     - colores de la casa >> 
 *                     - animal >> 
 *                     - rasgos  >> 
 *                     - fantasma >> 
 *                     - sala común >> 
 *                     - sala común custiodada por >> 
 * 
 * 
 *          - users
 *      - /utils
 *          db.js
 * 
 * Lo que tenemos que hacer: 
 * - 3 Modelos //? Characters, Houses, Users
 * - 2 CRUD (user no cuenta como CRUD) //? Un crud en Houses y otro en Characters >> 
 * - 2 Modelos relacionados //? Relacionar Houses con Characters (para ver de que casa es cada personaje).
 * - Autenticación con Registro y login de usuarios 
 */