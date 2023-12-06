const mysql = require("mysql");

function deleteById(table, id) {
  return new Promise((resolve, reject) => {
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
            resolve(result);
            return;
          }
        );
      });
    } catch (e) {
      reject(e);
      return;
    }
  });
}

module.exports = { deleteById };
