const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "sql_project_db",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
