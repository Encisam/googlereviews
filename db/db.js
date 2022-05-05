/*=================================
          mysql, conn
=================================*/
require("dotenv").config();
const mysql = require("mysql");
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
con.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

//MAKE QUERYS
function asyncQuery(query) {
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  asyncQuery,
};
