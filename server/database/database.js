const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "178.128.18.144",
  user: "ikhalas",
  password: "eimhtsj4",
  database: "erp",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded.");
  else
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = mysqlConnection;

