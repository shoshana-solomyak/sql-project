const con = require("./useConnection");

function getAllInfo(table) {
  return new Promise((resolve, reject) => {
    try {
      con.query(`select * from ${table}`, function (err, result) {
        if (err) throw err;
        resolve(result);
        return;
      });
    } catch (e) {
      reject(e);
      return;
    }
  });
}

function getSpecificInfo(table, field, value) {
  return new Promise((resolve, reject) => {
    try {
      con.query(
        `select * from ${table} where ${field} = "${value}"`,
        (err, result) => {
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

function getLimitedInfo(table, limit, offset) {
  return new Promise((resolve, reject) => {
    try {
      con.query(
        `select * from ${table} limit ${limit} offset ${offset}`,
        (err, result) => {
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

function getSpecificLimitedInfo(table, field, value, limit, offset) {
  return new Promise((resolve, reject) => {
    try {
      con.query(
        `select * from ${table} where ${field} = "${value}" limit ${limit} offset ${offset}`,
        (err, result) => {
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

module.exports = {
  getAllInfo,
  getSpecificInfo,
  getLimitedInfo,
  getSpecificLimitedInfo,
};
