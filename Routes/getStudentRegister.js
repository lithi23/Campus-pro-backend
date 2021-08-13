const express = require('express')
const router = express.Router()
const StudentRegister = require('../Models/studentReg.js')

router.post('/', async function(req,res){
    try{
        let{firstName,lastName,admissionNo,classS,section,address,fatherName,gender,dateOfBirth}=req.body
        console.log("inputs"+firstName +", "+ admissionNo)
        let StudentRegisterObj = new StudentRegister()
        StudentRegisterObj.firstName=firstName
        StudentRegisterObj.lastName=lastName
        StudentRegisterObj.admissionNo=admissionNo
        StudentRegisterObj.classS=classS
        StudentRegisterObj.section=section
        StudentRegisterObj.address=address
        StudentRegisterObj.fatherName=fatherName
        StudentRegisterObj.gender=gender
        StudentRegisterObj.dateOfBirth=dateOfBirth
        let result = await StudentRegisterObj.save()
        console.log("StudentRegisterObj; " +StudentRegisterObj)
        console.log("result: " +result)
        res.send(StudentRegisterObj)
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router