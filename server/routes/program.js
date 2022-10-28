var express = require('express');
var router = express.Router();
const programControllers = require("../controllers/programControllers");


//1.- createProgram
//localhost:4000/program/createProgram
router.post("/createProgram", programControllers.createProgram);




//2.- addExeciseProgram
//localhost:4000/program/addExeciseProgram
router.post("/addExeciseProgram", programControllers.addExeciseProgram);







//3.- addPatientProgram
//localhost:4000/program/addPatientProgram
router.post("/addPatientProgram", programControllers.addPatientProgram);

//4.-Borrar Ejerciciode un programa
//localhost:4000/program/deleteExercise

router.put('/deleteExercise', programControllers.deleteExercise)


//5.- Traer todos los ejercicios de un programa

//localhost:4000/program/allExercise/:program_id

router.get('/allExercise/:program_id', programControllers.allExercises)


//6.- TRae todos lo programas de un fisioterapeuta.
  //localhost:4000/program/allProgramPhysio/user_id

router.get('/allProgramPhysio/:user_id', programControllers.allProgramPhysio)


// 7.- Introduce los datos de personalización de ejercicio.
//localhost:4000/program/makeProgram
router.put('/makeProgram', programControllers.makeProg)

 //8.-Cambiar orden de ejercicio
// localhost:4000/program/addOrder

router.put('/addOrder', programControllers.addOrder)












//8.- Eliminar un programa de un paciente.
//localhost:4000/program/deleteProgram
router.delete('/deleteProgram', programControllers.deleteProgram)


module.exports = router;
