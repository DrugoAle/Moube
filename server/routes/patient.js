var express = require('express');
var router = express.Router();
const patientControllers = require("../controllers/patientControllers");
const multer = require("../middleware/multerSingle");



//1.- CreatePatient
//rutabase: localhost:4000/patient

//localhost:4000/patient/createPatient
router.post("/createPatient", multer("patient"), patientControllers.createPatient);



//-----------------------------------



//2.- Alta paciente
//localhost:4000/patient/editStatus/:user_id
router.put("/editStatus/:user_id", patientControllers.editStatus);

//2.1- Baja paciente
//localhost:4000/patient/editStatusBaja/:user_id
router.put("/editStatusBaja/:user_id", patientControllers.editStatusBaja);



//3.- Seleccina todos los programas de un paciente
//localhost:4000/patient/allprogramPatient/:user_id
router.get('/allprogramPatient/:user_id', patientControllers.getAllProgramPatient)




//4.-Selecciona los datos de un pacciente
//localhost:4000/patient/info/:user_id
router.get('/info/:user_id', patientControllers.getInfoPatient)









module.exports = router;
