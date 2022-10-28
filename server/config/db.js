//Requerimos la funcionalidad de la libreria mysql
var mysql      = require('mysql');
//Configurar la conexión con nuestra base de datos
var connection = mysql.createConnection({
  host     : process.env.DB_HOST || "localhost",
  user     : process.env.DB_USER || "root",
  password : process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "moubehealth",
});
 //Conectar con la base de datos
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log("Conexión correcta");
});
module.exports = connection;