const express = require('express')
const router = express.Router()
const Admins = require('../Models/adminModel')
const bcrypt=require('bcrypt')
const auth = require('../Middleware/auth')


router.post('/newUser', async function (req, res) {
    try {
        console.log("userid " + req.body.userID)
        let { userID, firstName, lastName, email, mobileNo, password,tokens } = req.body
        const AdminObj = new Admins()
        AdminObj.firstName = firstName
        AdminObj.lastName = lastName
        AdminObj.email = email
        AdminObj.mobileNo = mobileNo
        AdminObj.password = password
        AdminObj.userID = userID
        AdminObj.tokens.token=tokens.token

        let result = await AdminObj.save()
        console.log("input ; " + userID)
        console.log("result: " + result)
        res.send(result)
    }
    catch (e) {
        res.send(e)
    }
})

router.post('/signUp', async function (req, res) {
    
    try {
        let { userID, firstName, lastName, email, mobileNo, password } = req.body
        let result = await Admins.findOne({ "userID": userID })
        console.log("userid " + userID + " Result : ", result.userID);
        if (result !== null && result.firstName === "") {
            console.log("inside If")
            const filter = { "userID": userID };
           // const hashedPassword = await Admins.passHash(password);
           let encryptedPassword = await bcrypt.hash(password,3)
            console.log("hash " +encryptedPassword)
            const update = { firstName: firstName, lastName: lastName, email: email, mobileNo: mobileNo, password: encryptedPassword };

            let doc = await Admins.findOneAndUpdate(filter, update, {new: true});
            console.log("result: " + doc)
            res.send(doc)
        }
        else
        res.send("User ID already exist")

    }
    catch (e) {
        res.send(e)
    }
})

router.post('/login', async function (req, res) {
    
    try {
        let { userID, password } = req.body
        let admin = await Admins.findOne({ "userID": userID })
        console.log("admin : " +admin)
        if(admin){
            let validUser=await admin.login(password)
            console.log("valid: "+validUser)
            if(validUser){
            let token = await admin.generatetoken()
            res.status(200).send({token})
            }
            else
            res.status(401).send("failure") 
        }

    }

   catch (e) {
        res.send(e)
    }
})

router.get('/userInfo', auth, function(req,res){
    if(req.name)
    res.status(200).send(req.name)
    else
    res.status(401)
})
module.exports = router

