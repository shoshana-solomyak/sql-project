const con = require("./useConnection");

function deleteById(table, id) {
  return new Promise((resolve, reject) => {
    try {
      con.query(
        `update ${table} set is_active = false where id = ${id}`,
        function (err, result) {
          if (err) throw err;
          resolve(result);
          return;
        }
      );
    } catch (e) {
      reject(e);
      return;
    }
  });
}

module.exports = { deleteById };
