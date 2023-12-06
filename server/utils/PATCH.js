const mysql = require("mysql");

function patchById(table, id, obj) {
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
        for (const [key, value] of Object.entries(obj)) {
          con.query(
            `update ${table} set ${key} = ${value} where id = ${id}`,
            function (err, result) {
              if (err) throw err;
            }
          );
        }
        resolve(obj);
        return;
      });
    } catch (e) {
      reject(e);
      return;
    }
  });
}

module.exports = { patchById };
