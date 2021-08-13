const express=require('express')
const router=express.Router()
const multer = require('multer')
const ImageUpload = require('../Models/imageModel')

const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
          cb(new Error('only upload files with jpg or jpeg format.'));
        }
        cb(undefined, true); // continue with upload
      }
})


router.post('/images', upload.single('photo'), async (req, res) => {
      try {
        console.log("inside image post")
        const imageUpload = new ImageUpload();
        const file = req.file.buffer;
        console.log("input "+file)
        imageUpload.img = file;
  
       let result = await imageUpload.save();
        res.status(201).send(result._id );
      } catch (error) {
        res.status(500).send({
          upload_error: error.message
        });
      }
    },
    (error, req, res, next) => {
      if (error) {
        console.log("Image : "+error)
        res.status(500).send({
          upload_err: error.message
        });
      }
    }
  );
  
  router.get('/getImages', async (req, res) => {
    try {
      const images = await ImageUpload.find({});
      res.send(images);
    } catch (error) {
      res.status(500).send({ get_error: error });
    }
  });

  router.get('/imageById',async (req,res)=>{
  try{
  const images = await ImageUpload.findById(req.params.id)
  res.set('Content-Type', 'image/jpeg');
    res.send(result.images)
  }
  catch(err){
    console.log("image id "+err.message)
    res.status(400).send("problem with getting image")
  }
})
  module.exports = router