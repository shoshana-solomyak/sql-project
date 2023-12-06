const mysql = require("mysql");

function getAllInfo(table) {
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
        con.query(`select * from ${table}`, function (err, result) {
          if (err) throw err;
          resolve(result);
          return;
        });
      });
    } catch (e) {
      reject(e);
      return;
    }
  });
}

function getSpecificInfo(table, field, value, order) {
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
          `select * from ${table} where ${field} = "${value} order by${order}"`,
          (err, result) => {
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

function getLimitedInfo(table, limit, offset) {
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
          `select * from ${table} limit ${limit} offset ${offset}`,
          (err, result) => {
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

module.exports = { getAllInfo, getSpecificInfo, getLimitedInfo };
