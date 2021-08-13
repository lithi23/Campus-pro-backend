const express = require('express')
const router = express.Router()
const StudentRegister = require('../Models/studentReg.js')
const auth = require('../Middleware/auth')

router.post('/', auth, async function(req,res){
    try{
        console.log("auth user " +req.userID)
        if(req.userID!="" || req.userID!=null){
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
        StudentRegisterObj.createdBy.adminId=req.id
        StudentRegisterObj.createdBy.name=req.name
        let result = await StudentRegisterObj.save()
        console.log("StudentRegisterObj; " +StudentRegisterObj)
        console.log("result: " +result)
        res.send(result)
        }
        else{
            res.send("Please login")
        }
    }
    catch(err){
        res.send(err)
    }
})

router.post('/searchStudent',  async function (req, res) {
    
    try {
        const { firstName, lastName, classS, section, admissionNo } = req.body
        const inputs = {};
       //console.log("SEARCH : "+lastName)

         if(firstName!="" && firstName!= null && firstName!=undefined)
         inputs["firstName"]=firstName
         if(lastName !="" && lastName!=null && lastName!=undefined)
         inputs["lastName"]=lastName
         if(classS!="" && classS!=null && classS!=undefined)
         inputs["classS"]=classS
         if(section!="" && section !=null && section!=undefined)
         inputs["section"]=section
         if(admissionNo!="" && admissionNo!=null && admissionNo!=undefined)
         inputs["admissionNo"]=admissionNo
         //console.log(':::inputs:::', inputs);
        //console.log("EDIT : name : " +inputs + " admiss : " +inputs.admissionNo )
        let result = await StudentRegister.find(inputs)
        //console.log("edit : " + result)
        if(result)
        res.status(200).send(result)
        else
        res.status(401).send("No data found") 
      
    }
    catch (e) {
        res.send(e)
    }
})


router.post('/editStudent', auth, async function (req, res) {
    
    try {
        console.log('inside editStudent');
        const { firstName, lastName, classS, section, address, fatherName, gender, dateOfBirth} = req.body
        console.log('inside editStudent address : ' +address);
        const id = req.body._id
        const inputs = {};
        if(firstName!="" && firstName!= null && firstName!=undefined)
        inputs["firstName"]=firstName
        if(lastName !="" && lastName!=null && lastName!=undefined)
        inputs["lastName"]=lastName
        if(classS!="" && classS!=null && classS!=undefined)
        inputs["classS"]=classS
        if(section!="" && section !=null && section!=undefined)
        inputs["section"]=section
        if(address!="" && address!=null && address!=undefined)
        inputs["address"]=address
        if(fatherName!="" && fatherName!=null && fatherName!=undefined)
        inputs["fatherName"]=fatherName
        if(gender!="" && gender!=null && gender!=undefined)
        inputs["gender"]=gender
        if(dateOfBirth!="" && dateOfBirth!=null && dateOfBirth!=undefined)
        inputs["dateOfBirth"]=dateOfBirth
         console.log(':::inputsedit:::',inputs);
        inputs["updatedBy.adminId"]=req.id
         console.log('id : '+id)
         inputs["updatedBy.name"]=req.name
        //let result = await StudentRegister.find(inputs)
        let result= await StudentRegister.findByIdAndUpdate(id , inputs);
            console.log("result : " + result)
        if(result._id==id)
        res.status(200).send(result)
        else
        res.status(401).send("No data found") 
      
    }
    catch (e) {
        res.send(e)
    }
})


router.post('/getFees',  async function (req, res) {
    
    try {
        console.log('inside editStudent');
        const { admissionNo , dateOfBirth} = req.body
        console.log('inside editStudent address : ' +address);
        
        const inputs = {};
        if(admissionNo!="" && admissionNo!= null && admissionNo!=undefined)
        inputs["admissionNo"]=admissionNo
        if(dateOfBirth!="" && dateOfBirth!=null && dateOfBirth!=undefined)
        inputs["dateOfBirth"]=dateOfBirth
         console.log(':::inputsedit:::',inputs);

         console.log('id : '+id)
        //let result = await StudentRegister.find(inputs)
        let result= await StudentRegister.find(inputs);
            console.log("result : " + result)
        if(result)
        res.status(200).send(result)
        else
        res.status(401).send("No data found") 
      
    }
    catch (e) {
        res.send(e)
    }
})

module.exports = router

/*{
    "name":"df",
    "admissionNo":"A123456",
    "classS":"I",
    "section":"A",
    "address":"",
    "fatherName":"fd",
    "gender":"FEMALE",
    "dateOfBirth":"2020-12-01"
}*/