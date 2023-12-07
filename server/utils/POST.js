const con = require("./useConnection");

function postInfo(table, obj) {
  console.log("obj: ", obj);
  return new Promise((resolve, reject) => {
    try {
      const keys = Object.keys(obj);
      const values = Object.values(obj);

      con.query(
        `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values
          .map((val) => `'${val}'`)
          .join(", ")})`,
        function (err, result) {
          if (err) throw err;
          resolve(result);
          return;
        }
      );
    } catch (e) {
      resolve(e);
      return;
    }
  });
}

module.exports = { postInfo };
