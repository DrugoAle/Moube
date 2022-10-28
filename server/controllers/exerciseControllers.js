const connection = require("../config/db");
require("dotenv").config();

class exerciseController {
  //1.- Crear Ejercicio:
  // localhost:4000/exercise/createExercise

  createExercise = (req, res) => {
    console.log("req.body", req.body);

    const { name, description, video, userId } = req.body;

    let sql = `INSERT INTO exercise (name, description, video_link, user_creator_id) VALUES ('${name}', '${description}', '${video}', ${userId})`;

    connection.query(sql, (error, result) => {
      console.log(error);
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
    p;
  };

  //2.-Selecciona todos los ejercicios
  // localhost:4000/exercise/allExercise

  selectAllExercises = (req, res) => {
    console.log();

    let sql = `select * from exercise`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  //3.- Ejercicio de un programa
  // localhost:4000/exercise/oneExerciseProgram

  exerciseProgram = (req, res) => {
    console.log(req.params);

    const { program_id } = req.params;

    let sql = `SELECT exercise.*, program_exercise.* from exercise, program_exercise where program_exercise.exercise_id = exercise.exercise_id and  program_exercise.program_id = ${program_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };

  // 4.- desahibilita ejercicio para ver en tabla
  //localhost:4000/exercise/desableExer/:userId

  desableExer = (req, res) => {
    console.log(req.params);

    let { programId } = req.params;
    let { userId } = req.params;
    console.log(programId);
    let sql = `UPDATE program_exercise SET is_show = 1 WHERE program_id = "${programId}"`;
    let sql2 = `SELECT exercise.video_link, program.name, program.program_id, 
     user_patient_program.start_date, user_patient_program.end_date, 
     program_exercise.is_show
     FROM exercise, program_exercise, user_patient_program, program 
     WHERE program.program_id = program_exercise.program_id
     and program.program_id = user_patient_program.program_id 
     and exercise.exercise_id = program_exercise.exercise_id
     and user_patient_program.user_id = ${userId}
     and program_exercise.order_position = 1`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultExer) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultExer);
    });
  };
  //-------------------------------------------------
  // 5.- habilita ejercicio para ver en tabla
  //localhost:4000/exercise/enableExer/:userId

  enableExer = (req, res) => {
    console.log(req.params);

    let { program_id } = req.params;
    console.log(program_id);
    let sql = `UPDATE program_exercise SET is_show = 0 WHERE program_id = "${program_id}"`;
    let sql2 = "SELECT * from program_exercise";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultExer) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultExer);
    });
  };

  //6.- Eliminar un ejercio.
  //localhost:4000/exercise/deleteExer

  deleteExer = (req, res) => {
    console.log(req.body);
    const { exercise_id } = req.body;
    let sql = `DELETE FROM exercise WHERE exercise_id = ${exercise_id} `;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result);
    });
  };
}
module.exports = new exerciseController();
