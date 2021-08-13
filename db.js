
const mongoose = require("mongoose")
const dbURL = "mongodb+srv://crampete:vasana23@cluster0.9uek3.mongodb.net/merndb?retryWrites=true&w=majority"

function mongoConnection(){
    mongoose.connect(dbURL,{useNewUrlParser : true,useUnifiedTopology:true})
}


module.exports=mongoConnection