var express = require('express');

const multerSingle = require('../middleware/multerSingle')
const verify = require("../middleware/verify")


const usersControllers = require("../controllers/usersControllers");
var router = express.Router();


//-----------------------------------------------------
//1.- createUser
//localhost:4000/users/createUser
router.post("/createUser", usersControllers.createUser);

//-------------------------------------------------------
//2.-login
//localhost:4000/users/login
router.post("/login", usersControllers.login);

//------------------------------------------------------
//3.-Trae la información de un usuario
//localhost:4000/users/oneUser/:user_id  
router.get("/oneUser/:user_id", usersControllers.viewPhysio);

//-----------------------------------------------------
//4.-Editar un usuario 
//localhost:4000/users/editProfile/:userId       
router.put("/editProfile/:user_id", multerSingle("user"), usersControllers.editProfile);

//5.-Trae la información de un usuario para modificarla
//localhost:4000/users/getEditProfile/:user_id  
router.get("/getEditProfile/:user_id", usersControllers.getEditProfile);

//6.- Selecionar todos los Pacientes de un Fisioterapeuta.
//localhost:4000/users/allPatiens/:user_id
router.get('/allPatiens/:user_id', usersControllers.getPatiens);




module.exports = router;