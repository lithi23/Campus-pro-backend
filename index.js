const express = require('express')
const studentRegRoutr = require('./Routes/studentRegister')
const adminRouter =require('./Routes/admin')
const imageUpload =require('./Routes/imageUpload')
const fees = require('./Routes/fees')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoConnection = require('./db')

app.use(cors())
app.use(bodyParser.json())
mongoConnection()


app.get('/', function(req,res)
{
    res.send("hello world")
})

app.use('/studentRegister',studentRegRoutr)
app.use('/adminSignup',adminRouter)
app.use('/imageUploader',imageUpload)
app.use('/onlineFees',fees)


app.listen('8001')