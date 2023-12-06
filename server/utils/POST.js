const mysql = require("mysql");

function postInfo(table, obj) {
  console.log("obj: ", obj);
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
        const keys = Object.keys(obj);
        const values = Object.values(obj);

        con.query(
          `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values
            .map((val) => `'${val}'`)
            .join(", ")})`,
          function (err, result) {
            if (err) throw err;
          }
        );

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
