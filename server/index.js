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

app.use('/api/user', users_router)
app.use('/api/shop', shop_router)
app.use('/api/product', product_router)
app.use('/api/sharing', sharing_router)

app.listen(app.get('port'), function() {
  console.log("Node is running at localhost:" + app.get('port'))
})
