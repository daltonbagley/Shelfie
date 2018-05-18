const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controller')
const massive = require('massive')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    
})

const baseUrl = '/api/inventory/'
app.get(`${baseUrl}`, controller.readProducts)

app.post("/api/product", controller.createProduct)
app.delete("/api/product/:id", controller.deleteProduct)
app.put("/api/product/:id", controller.editProduct)
app.listen(3001, ()=> {console.log('Server is running on port 3001')}) 

