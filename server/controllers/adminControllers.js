const connection = require("../config/db");

class adminControllers {
  //1.- Trae todos los datos de todos los usuarios
  //localhost:4000/admin/getAllUsers

  getAllUsers = (req, res) => {
    let sql = "SELECT * FROM user WHERE is_deleted = 0";
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  // 2.- desahibilita un usuario de manera lógica
  //localhost:4000/admin/desableUser/:userId

  desableUser = (req, res) => {
    console.log(req.params);

    let { id } = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted = 1 WHERE user_id = "${id}" and is_deleted = 0`;
    let sql2 = "SELECT * from user";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };

  // 3.- habilita un usuario de manera lógica
  //localhost:4000/admin/enableUser/:userId

  enableUser = (req, res) => {
    console.log("Enable User activated");
    console.log(req.params);

    let { id } = req.params;
    console.log(id);
    let sql = `UPDATE user SET is_deleted = 0 WHERE user_id = "${id}"`;
    let sql2 = "SELECT * from user";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);
    });
    connection.query(sql2, (error, resultUsers) => {
      error
        ? res.status(400).json({ error })
        : res.status(200).json(resultUsers);
    });
  };
}

module.exports = new adminControllers();
