const connection = require("../config/db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class patientController {
  //1.-cratePatient
  //localhost:4000/patient/createPatient

  createPatient = (req, res) => {
    const {
      name,
      surname,
      dni,
      city,
      country,
      phoneNumber,
      email,
      password,
      injuryType,
      physioId,
      gender,
      birthdate,
      description,
    } = req.body;

    console.log(req.body);

    let saltRounds = 8;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sqlUser = `INSERT into user (name, surname, dni, city, country, phone_number, category, email,  password)
                values ('${name}', '${surname}', '${dni}', '${city}', '${country}', '${phoneNumber}', 3, '${email}', '${hash}');`;

        connection.query(sqlUser, (error, resultUser) => {
          if (error) {
            console.log(error);
            resultUser.status(400).json({ error });
          }

          let user_id = resultUser.insertId;

          console.log(resultUser);

          let sqlPatient = `INSERT into patient_info (user_id, user_physio_id, injury_type, gender, birthdate, description)
                    values (${user_id}, ${physioId}, '${injuryType}', '${gender}', ${birthdate}, '${description}' )`;
          connection.query(sqlPatient, (error1, resultPatient) => {
            if (error) throw error;

            if (error1) {
              console.log(error1);
              res.status(400).json({ error1 });
            }

            res.status(200).json({ resultUser, resultPatient });
            console.log(password, "lacontraseña, a ver si funciona mate");
            //Función utilizado para mandar el correo con la contraseña a los pacientes que registre el fisio..
            async function main() {
              let transporter = nodemailer.createTransport({
                //DEV host: "smtp.ethereal.email",
                host: "smtp.serviciodecorreo.es",
                //port: 587,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  //user: "george99@ethereal.email", // generated ethereal user
                  user: "tech@moubehealth.com",
                  //pass: "bPS99ZyJEF1hPA7FXD", // generated ethereal password
                  pass: "Tech2022%",
                }, //Aqui se debe indicar la información del host que enviará los email a los pacientes con sus credenciales.
              });

              let info = await transporter.sendMail({
                //from: '"Fred Foo 👻" <foo@example.com>', // sender address
                from: '"Fred Foo 👻" <tech@moubehealth.com>',
                to: `${email}`,
                subject: "Hola, bienvenido a MoubeHealth ✔",
                text: `'El usuario para acceder será su email, y la contraseña es' ${password}`, // plain text body
              });

              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

              // Preview only available when sending through an Ethereal account
              console.log(
                "Preview URL: %s",
                nodemailer.getTestMessageUrl(info)
              );
            }
            main().catch(console.error);
          });
        });
      });
    });
  };

  //---------------------------------------------------------

  // 2.- Alta paciente
  //localhost:4000/patient/editStatus/:user_id

  editStatus = (req, res) => {
    console.log("esto es el editStatus");
    console.log(req.params);

    const { user_id } = req.params;
    let sql = `UPDATE patient_info SET status = 2 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  // 2.1- Bajapaciente
  //localhost:4000/patient/editStatusBaja/:user_id

  editStatusBaja = (req, res) => {
    console.log("esto es el editStatus");
    console.log(req.params);

    const { user_id } = req.params;
    let sql = `UPDATE patient_info SET status = 1 WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //---------------------------------------------------------

  //3.- Seleccina todos los programas de un paciente
  //localhost:4000/patient/allprogramPatient/:user_id

  getAllProgramPatient = (req, res) => {
    console.log(req.params, "Parammsssss");
    let userId = req.params.user_id;
    let sql = `SELECT exercise.video_link, program.name, program.program_id, 
    user_patient_program.start_date, user_patient_program.end_date, 
    program_exercise.is_show
    FROM exercise, program_exercise, user_patient_program, program 
    WHERE program.program_id = program_exercise.program_id
    and program.program_id = user_patient_program.program_id 
    and exercise.exercise_id = program_exercise.exercise_id
    and user_patient_program.user_id = ${userId}
    and program_exercise.order_position = 0`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //4.-Selecciona los datos de un pacciente
  //localhost:4000/patient/info/:user_id

  getInfoPatient = (req, res) => {
    let patient_id = req.params.user_id;
    console.log(patient_id);
    let sql = `select *  from patient_info, user_patient_program, program 
    where patient_info.user_id = ${patient_id} and user_patient_program.user_id = patient_info.user_id
    and program.program_id = user_patient_program.program_id`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };
}

module.exports = new patientController();
