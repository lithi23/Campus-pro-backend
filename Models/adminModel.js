const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const adminSchema = new mongoose.Schema({
"userID":{"type":String,"required":true},
"firstName":String,
"lastName":String,
"email":String,
"mobileNo":String,
"password":String,
"tokens":[
    {"token":String}
]
}

)

adminSchema.methods.passHash =async function (password){
    try{
    let encryptedPassword = await bcrypt.hash(password,3)
    return encryptedPassword
    }
    catch(e){
        console.log("passHash error: " + e)
    }
}

adminSchema.methods.login =async function (password){
    try{
    let admin = this
    return bcrypt.compare(password,admin.password)
    }
    catch(e){
        console.log("passHash error: " + e)
    }
}

adminSchema.methods.generatetoken = async function(){
    try{
    let admin = this
    console.log("generatetoke userID"+ admin.userID)
    let token = await jwt.sign({"userID":admin.userID},"SECRETPWD",{expiresIn:'1h'})
    
    admin.tokens =await admin.tokens.concat({"token":token}) // Key and Value is same so key can be omitted
    console.log("token " + admin.tokens)
    await admin.save()
    return token
    }
    catch(e){
        console.log(e)
    }
}

adminSchema.statics.findUserByToken = async function (token){
    try{
    console.log("finduserbytoken " + token)
    token = token.replace("Bearer ","")
    let payload = jwt.verify(token,"SECRETPWD")
    console.log("payload user : " +payload.userID)
    let userID = payload.userID
    let user = await Admins.findOne({"userID":userID,"tokens.token":token})
    console.log("find one token : "+ user )
    return await Admins.findOne({"userID":userID,"tokens.token":token})
    }
    catch(e){
        console.log(e)
    }
}



const Admins = mongoose.model('admins',adminSchema)
module.exports=Admins

