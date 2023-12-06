const mysql = require("mysql");

export function deleteById(table, id) {
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
        `update ${table} set is_active = false where id = ${id}`,
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
