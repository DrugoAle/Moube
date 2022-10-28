var express = require('express');
var router = express.Router();
const multerSingle = require('../middleware/multerSingle')


const exerciseController = require ('../controllers/exerciseControllers');


//ruta base exercise:
//localhost:4000/exercise 

//1.- Crear Ejercicio:
// localhost:4000/exercise/createExercise
router.post('/createExercise', exerciseController.createExercise)

//2.-Selecciona todos los ejercicios
// localhost:4000/exercise/allExercise
router.get('/allExercise', exerciseController.selectAllExercises)


//3.- Ejercicio de un programa
// localhost:4000/exercise/oneExerciseProgram
router.get('/oneExerciseProgram/:program_id', exerciseController.exerciseProgram)


    // 4.- desahibilita ejercicio para ver en tabla
  //localhost:4000/exercise/desableExer/:program_id
  router.put('/desableExer/:program_id', exerciseController.desableExer)



  // 5.- habilita ejercicio para ver en tabla
  //localhost:4000/exercise/enableExer/:program_id
  router.put('/enableExer/:program_id', exerciseController.enableExer)

//6.- Eliminar un ejercio.
//localhost:4000/exercise/deleteExer
router.delete('/deleteExer', exerciseController.deleteExer)


module.exports = router;
