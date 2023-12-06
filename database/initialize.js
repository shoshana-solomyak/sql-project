const mysql = require("mysql");
const fs = require("fs");
const express = require("express");
const app = express();
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
});

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE sql-project-db", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
