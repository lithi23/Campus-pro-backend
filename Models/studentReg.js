const mongoose = require('mongoose')
const Admin = require('./adminModel')

const studentRegSchema = new mongoose.Schema({
    "firstName":{"type":String,"required":true},
    "lastName":String,
    "admissionNo": {"type":String,"required":true,"unique":true},
    "classS":{"type":String,"required":true},
    "section":{"type":String,"required":true},
    "address":String,
    "fatherName":String,
    "gender":{"type":String,"required":true,"enum":['MALE','FEMALE']},
    "dateOfBirth":{"type":Date,"required":true},
    "createdBy":{
        "adminId":{
        "type":mongoose.Schema.Types.ObjectId,
        "ref":Admin},
        "name":String,
        "createdOn":{"type":Date,"default":Date.now()}
    },
    "updatedBy":{
        "adminId":{
        "type":mongoose.Schema.Types.ObjectId,
        "ref":Admin},
        "name":String,
        "updatedOn":{"type":Date,"default":Date.now()}
    },
    "feeDetails":[
        {
        "year":String,
        "amount":Number,
        "paymentStatus":{"type":String,"enum":["Paid","Not Paid"],"default":"Not Paid"}
    }

    ]
})
let StudentRegister = mongoose.model('StudentRegisters',studentRegSchema)
module.exports=StudentRegister