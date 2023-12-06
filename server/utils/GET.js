const mysql = require("mysql");

function getAllInfo(table) {
  try {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "z10mz10m",
      database: "sql_project_db",
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(`select * from ${table}`, function (err, result) {
        if (err) throw err;
        return result;
      });
    });
  } catch (e) {
    return null;
  }
}

function getSpecificInfo(table, field, value) {
  try {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "z10mz10m",
      database: "sql_project_db",
    });
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      con.query(
        `select * from ${table} where ${field} = ${value}`,
        function (err, result) {
          if (err) throw err;
          return result;
        }
      );
    });
  } catch (e) {
    return null;
  }
}
