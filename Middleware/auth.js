const Admins = require('../Models/adminModel')

async function auth (req,res,next){
let token = req.headers.authorization
try{
let admin = await Admins.findUserByToken(token)
req.id=admin._id
req.userID = admin.userID
req.name=admin.firstName + " " + admin.lastName
next()
}
catch(e){
res.status(401).send("Please Login")
}
}

module.exports = auth
