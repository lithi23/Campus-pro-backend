const mongoose = require('mongoose')
const Admin = require('./adminModel')


const feeSchema = new mongoose.Schema({
    "classS":{"type":String,"required":true},
    "fees":[{
        "year":String,
        "amount":Number,
        "createdOn":{type: Date, default: Date.now},
        "createdBy":{
            "adminId":{"type":mongoose.Schema.Types.ObjectId,"ref":Admin},
            "name":String
        }
    }]
})

const Fees = mongoose.model("fee", feeSchema)
module.exports=Fees