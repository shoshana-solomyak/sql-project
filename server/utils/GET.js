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

// async function getSpecificInfo(table, field, value) {
//   try {
//     const con = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "z10mz10m",
//       database: "sql_project_db",
//     });
//     con.connect(function (err) {
//       if (err) throw err;
//       console.log("Connected!");
//       con.query(
//         `select * from ${table} where ${field} = ${value}`,
//         function (err, result) {
//           if (err) throw err;

//           console.log("result: ", result);
//           return result;
//         }
//       );
//     });
//   } catch (e) {
//     return null;
//   }
// }

const mysql = require("mysql");

function getSpecificInfo(table, field, value) {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "z10mz10m",
      database: "sql_project_db",
    });

    con.connect(function (err) {
      if (err) {
        reject(err); // Reject the Promise on connection error
        return;
      }
      console.log("Connected!");
      con.query(
        `SELECT * FROM ${table} WHERE ${field} = ${value}`,
        function (err, result) {
          if (err) {
            reject(err); // Reject the Promise on query error
            return;
          }
          console.log("result: ", result);
          resolve(result); // Resolve the Promise with the query result
        }
      );
    });
  });
}
