var express = require('express');
var adminControllers = require("../controllers/adminControllers");
var router = express.Router();

//1.- trae los datos de todos los usuarios
//------------------------------------------
router.get("/getAllUsers", adminControllers.getAllUsers);

//2.- deshabilita un usuario
//--------------------------------------------
router.put("/desableUser/:id", adminControllers.desableUser);

//3.- habilita un usuario
//--------------------------------------------
router.put("/enableUser/:id", adminControllers.enableUser);


module.exports = router;