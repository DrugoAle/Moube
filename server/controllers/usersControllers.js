const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class usersController {
  //1.Crear usuario
  //localhost:4000/users/createUser

  createUser = (req, res) => {
    console.log("req.body", req.body);

    const {
      name,
      surname,
      dni,
      email,
      password,
      city,
      country,
      collegiate_number,
      phone_number,
      company,
    } = req.body;
    if (
      name == "" ||
      surname == "" ||
      dni == "" ||
      email == "" ||
      phone_number == "" ||
      city == "" ||
      password == ""
    ) {
      console.log("Credenciales incorrectas");
      res.status(400).json({ error });
    }
    const saltRounds = 7;
    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (name, surname, dni, city, country,  collegiate_number, phone_number, company, email,  password) VALUES ('${name}', '${surname}', '${dni}', '${city}', '${country}', '${collegiate_number}', '${phone_number}', '${company}', '${email}', '${hash}')`;
        console.log("sql", sql);

        connection.query(sql, (error, result) => {
          console.log(error);
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    });
  };

  //2.Login
  //localhost:4000/users/login

  login = (req, res) => {
    console.log(req.body);
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      // //en caso de error en la consulta
      if (error) return res.status(400).json(error);
      console.log(result[0].name);
      // //si no encontramos el email.
      if (!result || !result.length) {
        res.status(401).json("Usuario no registrado");
      } else {
        const { password, user, category } = result[0];
        console.log(password, "este es el password");
      }
      const hash = result[0].password;

      const user_id = result[0].user_id;
      const category = bcrypt.compare(password, hash, (error, response) => {
        if (error) throw error;
        if (response === true) {
          const token = jwt.sign(
            {
              user: {
                email: result[0].email,
                id: user_id,
                category: result[0].category,
              },
            },
            process.env.SECRET,
            { expiresIn: "5min" }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json("Usuario y contraseña incorrectos");
        }
      });
    });
  };

  /// 3. - Ver un fisio con todos sus pacientes
  //localhost:4000/users/oneUser/:user_id

  viewPhysio = (req, res) => {
    const user_id = req.params.user_id;

    // lista paciente con status 1 (en tratamiento) sin estar eliminado
    let sqlPatienStatus1 = `SELECT img, email FROM user, patient_info WHERE user_physio_id =  ${user_id} and category = 3 and status = 1 and is_deleted = 0;`;
    console.log("se ha ejecutado el sqlPatienStatus1");
    // lista paciente con status 2 (en alta) sin estar eliminado
    let sqlPatienStatus2 = `SELECT img, email FROM user, patient_info WHERE user_physio_id =  ${user_id} and category = 3 and status = 2 and is_deleted = 0;`;

    // informacion del fisio
    let sqlPhysio = `SELECT img, name from user WHERE user_id = ${user_id}`;

    connection.query(sqlPhysio, (error, resultPhysio) => {
      if (error) {
        res.status(400).json({ error });
      }
      connection.query(sqlPatienStatus1, (error2, resultPatienStatus1) => {
        if (error2) {
          res.status(400).json({ error2 });
        }
        connection.query(sqlPatienStatus2, (error3, resultPatienStatus2) => {
          if (error3) {
            res.status(400).json({ error3 });
          }
          res
            .status(200)
            .json({ resultPhysio, resultPatienStatus1, resultPatienStatus2 });
        });
      });
    });
  };

  //-----------------------------------------------------
  /// 4.- Editar un usuario
  //localhost:4000/users/editProfile/:user_id

  editProfile = (req, res) => {
    let user_id = req.params.user_id;

    const { name, surname, email, city, country, phone_number, company } =
      JSON.parse(req.body.register);
    // console.log(user_id)
    // console.log(req.body, "el req.bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    // console.log(req.file.filename)
    console.log(name);
    let sql = "";
    if (req.file != undefined) {
      let profilePic = req.file.filename;
      sql = `UPDATE user SET name = "${name}", surname = "${surname}", email = "${email}", city = "${city}", country = "${country}", company = "${company}", phone_number = "${phone_number}", img = "${profilePic}" WHERE user.user_id = ${user_id} AND is_deleted = 0`;
    } else {
      sql = `UPDATE user SET name = "${name}", surname = "${surname}", email = "${email}", city = "${city}", country = "${country}", company = "${company}", phone_number = "${phone_number}" WHERE user.user_id = ${user_id} AND is_deleted = 0`;
    }

    connection.query(sql, (error, result) => {
      if (error) throw error;
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //-----------------------------------------------
  // 5.- Trae la info de un usuario para editarlo
  //localhost:4000/users/getEditProfile/:userId

  getEditProfile = (req, res) => {
    console.log(req);
    let user_id = req.params.user_id;
    let sql = `SELECT * FROM user WHERE user_id = "${user_id}" AND is_deleted = 0`;
    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
    });
  };

  //6.- Selecionar todos los Pacientes de un Fisioterapeuta.

  //localhost:4000/users/allPatiens/:user_id

  getPatiens = (req, res) => {
    let user_id = req.params.user_id;

    let sql = `SELECT * from patient_info, user where patient_info.user_id = user.user_id and patient_info.user_physio_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      error ? res.status(400).json({ error }) : res.status(200).json(result);
      console.log(error);
    });
  };
}

module.exports = new usersController();
