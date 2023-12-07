const con = require("./useConnection");

function patchById(table, id, obj) {
  return new Promise((resolve, reject) => {
    try {
      let counter = 0;
      for (const [key, value] of Object.entries(obj)) {
        con.query(
          `update ${table} set ${key} = '${value}' where id = ${id}`,
          function (err, result) {
            if (err) throw err;
            counter++;
            if (counter === Object.keys(obj).length) {
              resolve(obj);
              return;
            }
          }
        );
      }
    } catch (e) {
      reject(e);
      return;
    }
  });
}

module.exports = { patchById };
