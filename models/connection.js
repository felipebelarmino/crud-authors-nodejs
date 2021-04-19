const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  user: "root",
  password: "@D14m09#**651205",
  host: "localhost",
  database: "model_example",
});

module.exports = connection;
