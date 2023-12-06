const mysql = require("mysql");

export function patchById(table, id, obj) {
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
      for (const [key, value] of Object.entries(obj)) {
        con.query(
          `update ${table} set ${key} = ${value} where id = ${id}`,
          function (err, result) {
            if (err) throw err;
          }
        );
      }
      return obj;
    });
  } catch (e) {
    return null;
  }
}
