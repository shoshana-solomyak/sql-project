const mysql = require("mysql");

function postInfo(table, obj) {
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
            `insert into ${table} (${key}) values(${value})`,
            function (err, result) {
              if (err) throw err;
            }
          );
        }
        resolve(obj);
        return;
      });
    } catch (e) {
      resolve(e);
      return;
    }
  });
}

module.exports = { postInfo };
