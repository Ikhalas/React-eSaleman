const express = require("express");
var cors = require('cors')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(cors())

const users_router = require('./routes/users')
const shop_router = require('./routes/shops')
const product_router = require('./routes/products')
const sharing_router = require('./routes/sharing')


app.get("/", (req, res) => {
  res.sendStatus(404) //Not found
  res.send('root')
})

app.use('/user', users_router)
app.use('/shop', shop_router)
app.use('/product', product_router)
app.use('/sharing', sharing_router)



/*
//Delete an product
app.delete("/product/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM product_list WHERE product_ID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully.");
      else console.log(err);
    }
  );
});

//Insert an product
app.post("/product", (req, res) => {
  let user = {
    product_Name: "หมวก",
    product_Price: "200",
    product_Detail: "หมวกสีแดง",
  };
  let sql = " INSERT INTO product_list SET ? ";
  mysqlConnection.query(sql, user, (error, results, fields) => {
    console.log(error);
    if (error) {
      throw error;
    }
    res.send("Inserted successfully.");
  });
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
*/

app.listen(app.get('port'), function() {
  console.log("Node is running at localhost:" + app.get('port'))
})
