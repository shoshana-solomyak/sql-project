const mysql = require("mysql");
const fs = require("fs");
const { json } = require("express");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("DROP DATABASE IF EXISTS sql_project_db", function (err, result) {
    if (err) throw err;
    console.log("Database droped");
  });
  con.query("CREATE DATABASE sql_project_db", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  con.query("use sql_project_db", function (err, result) {
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
    insertUsers();
    insertTodos();
    insertPosts();
    insertComments();
    insertUser_Password();
  });
});

function insertUsers() {
  const users = {};
  fs.readFile("./intialData/users.json", (err, content) => {
    if (err) throw err;
    parsedUsers = JSON.parse(content);
    console.log(" parsedUsers: ", parsedUsers);
    const insertValues = parsedUsers.map((obj) => {
      return [obj.name, obj.username, obj.email, true];
    });

    con.query(
      "INSERT INTO user (name, username, email, is_active) VALUES ?",
      [insertValues],
      function (err, result) {
        if (err) throw err;
        console.log("users inserted");
      }
    );
  });
}

function insertTodos() {
  fs.readFile("./intialData/todos.json", (err, content) => {
    if (err) throw err;

    const todos = JSON.parse(content);

    const insertValues = todos.map((obj) => {
      return `(${obj.userId}, "${obj.title}", ${obj.completed}, true)`;
    });

    const insertQuery = `INSERT INTO todo (user_id, title, completed, is_active) VALUES ${insertValues.join(
      ", "
    )}`;

    con.query(insertQuery, (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} Todos inserted`);
    });
  });
}

function insertPosts() {
  fs.readFile("./intialData/posts.json", (err, content) => {
    if (err) throw err;

    const posts = JSON.parse(content);

    posts.forEach((post) => {
      con.query(
        `INSERT INTO post (user_id, title, body, is_active) VALUES (?, ?, ?, ?)`,
        [post.userId, post.title, post.body, true],
        function (err, result) {
          if (err) throw err;
          console.log("Post inserted");
        }
      );
    });
  });
}
function insertComments() {
  fs.readFile("./intialData/comments.json", (err, content) => {
    if (err) throw err;

    const comments = JSON.parse(content);

    comments.forEach((comment) => {
      con.query(
        `INSERT INTO comment (post_id, title, body, is_active) VALUES (?, ?, ?, ?)`,
        [comment.postId, comment.name, comment.body, true],
        function (err, result) {
          if (err) throw err;
          console.log("Comment inserted");
        }
      );
    });
  });
}

function insertUser_Password() {
  fs.readFile("./intialData/users.json", (err, content) => {
    if (err) throw err;

    const users = JSON.parse(content);

    users.forEach((user) => {
      con.query(
        `INSERT INTO user_password (user_id, password) VALUES (?, ?)`,
        [user.id, user.website], // Assuming user's website is the password
        function (err, result) {
          if (err) throw err;
          console.log("User password inserted");
        }
      );
    });
  });
}
