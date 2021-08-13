var mongoose = require('mongoose')


const imageSchma = new mongoose.Schema(
    {
        "img":{
           type:Buffer

        }
    }
)

imageSchma.methods.toJSON = function () {
    const result = this.toObject();
    delete result.img;
    return result;
  };

const ImageUpload = mongoose.model('ImageUpload',imageSchma) 

module.exports=ImageUpload