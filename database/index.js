const mysql = require("mysql");
const fs = require("fs");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS sql-project-db", function (err, result) {
    if (err) throw err;
    console.log("Database droped");
  });
  con.query("CREATE DATABASE sql-project-db", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("use sql-project-db", function (err, result) {
    if (err) throw err;
    console.log("Database used");
  });
  fs.readdir("./entities", (err, files) => {
    if (err) throw err;
    for (let file of files) {
      fs.readFile(`./entities/${file}`, (err, content) => {
        if (err) throw err;
        const name = file.split(".")[0];
        const obj = JSON.parse(content);
        let string = "";
        for (const [key, value] of Object.entries(obj)) {
          string += `, ${key} ${value}`;
        }
        string = string.slice(1);
        con.query(`CREATE TABLE ${name}(${string})`, function (err, result) {
          if (err) throw err;
          console.log(`${name} table created`);
        });
      });
    }
  });
});
