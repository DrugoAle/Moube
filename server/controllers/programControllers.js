const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class programController {
  //1.Crear programa
  //localhost:4000/program/createProgram

  createProgram = (req, res) => {
    console.log("este es el req.body", req.body);

    const { name, userId } = req.body;

    let sql = `INSERT INTO program (name, user_creator_id) VALUES ('${name}', '${userId}')`;

    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }

      res.status(200).json({ result });
    });
  };

  //2.- addExeciseProgram
  // Asignar un ejercicio a un programa
  //localhost:4000/program/addExeciseProgram

  addExeciseProgram = (req, res) => {
    console.log(req.body, "SOY el console.log de addExerciseeeeeee");
    const { programName, user_id, exerciseList } = req.body;
    let sql = `INSERT INTO program (name, user_creator_id) VALUES ('${programName}', '${user_id}')`;
    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      let program_id = result.insertId;
      console.log("gggggggglllllllllllrrrrrrrrrrrwwwwwwwwwwwwwwwww");
      this.saveExercise(exerciseList, program_id);
      res.status(200).json(program_id);
    });
  };
  saveExercise = (exerciseList, program_id) => {
    console.log(exerciseList);
    exerciseList.forEach((element, index) => {
      let sql = `INSERT INTO program_exercise (exercise_id, program_id, order_position )
    VALUES (${element}, ${program_id}, ${index}) `;
      connection.query(sql, (error, result) => {
        if (error) throw error;
        if (error) {
          console.log(error);
          res.status(400).json({ error });
        }
        console.log(result);
      });
    });
  };
  //3.-DeletedExerciseProgram
  //localhost:4000/program/deleteExercise

  deleteExercise = (req, res) => {
    const { exerciseId, programId } = req.body;

    let sql = `DELETE FROM program_exercise 
  where exercise_id = ${exerciseId} and program_id = ${programId}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //4.- addPatientProgram
  // Asignar un programa  al paciente
  //localhost:4000/program/addPatientProgram

  addPatientProgram = (req, res) => {
    const { program_id, patient_id, startDate, endDate } = req.body;
    console.log(req.body, "bodyyysssss");

    let sql = `INSERT INTO user_patient_program (program_id, user_id, start_date, end_date) VALUES (${program_id},${patient_id}, '${startDate}', '${endDate}')`;

    connection.query(sql, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }

      res.status(200).json({ result });
    });
  };

  //5.- Traer todos los ejercicios de un programa

  //localhost:4000/program/allExercise/:program_id

  allExercises = (req, res) => {
    const { program_id } = req.params;

    let sql = `select program_exercise.*, exercise.*, program.program_id from program_exercise, exercise, program where program.program_id = ${program_id} and exercise.exercise_id = program_exercise.exercise_id and program.program_id = program_exercise.program_id;`;

    let sql2 = `SELECT program.name, program.user_creator_id from program where program.program_id = ${program_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sql2, (error2, result2) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        res.status(200).json({ result, result2 });
      });
    });
  };

  //6.- Trae todos lo programas de un fisioterapeuta.
  //localhost:4000/program/allProgramPhysio/:physio_id

  allProgramPhysio = (req, res) => {
    let { user_id } = req.params;

    let sql = `SELECT program.program_id, program.name, exercise.video_link
    from program, exercise, program_exercise where program.program_id = program_exercise.program_id 

    and program_exercise.exercise_id = exercise.exercise_id and program.user_creator_id = ${user_id}
    and program_exercise.order_position = 0`;

    console.log(sql);

    connection.query(sql, (error, result) => {
      console.log(result, "TODOS LOS PROGRAMAS");
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 7.- Introduce los datos de personalización de ejercicio.
  //localhost:4000/program/makeProgram

  makeProg = (req, res) => {
    console.log(req.body);

    const programList = req.body;

    let sql = "";
    // let sql2 = "SELECT * FROM user";

    programList.forEach((element) => {
      const { sets, reps, rest, exercise_id, program_id } = element;
      sql = `UPDATE program_exercise SET sets='${sets}', reps= '${reps}', rest= '${rest}' where  program_exercise.exercise_id = ${exercise_id} and program_exercise.program_id = ${program_id}`;

      connection.query(sql, (error, result) => {
        if (error) throw error;
      });
    });
    res.status(200).json("result");
  };

  //8.-Cambiar orden de ejercicio
  // localhost:4000/program/addOrder

  addOrder = (req, res) => {
    const characters = req.body;

    console.log(req.body);
    console.log(characters, "Ester es el charactes");

    for (let i = 0; i < characters.length; i++) {
      console.log(i);
      const { order_position, exercise_id, program_id } = characters[i];

      console.log(exercise_id, program_id, order_position);

      let sql = `UPDATE program_exercise SET order_position='${i}' where  program_exercise.exercise_id = ${exercise_id} and program_exercise.program_id = ${program_id}`;

      console.log(sql);

      connection.query(sql, (error, result) => {
        if (error) throw error;
      });
    }
    res.status(200).json("result");
  };

  //09.- Eliminar un programa de un paciente.//Sin ruta.
  //localhost:4000/program/deleteProgram

  deleteProgram = (req, res) => {
    console.log(req.body);
    const { patient_program_id } = req.body;
    let sql = `DELETE FROM user_patient_program WHERE patient_program_id = ${patient_program_id} `;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(result, "Esto es el result");
    });
  };
}

module.exports = new programController();
