// const path = require('path');
const multer = require('multer');
const{LIMIT_PICTURE}= process.env;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params: {folder: 'JMoney',
    format: async(req, file) => {
      const formatExt = file.mimetype.split('/')[1];
      return formatExt; 
    },
    public_id: (req, file) => new Date().getTime()
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(LIMIT_PICTURE) * 1024 * 1024
  },
  fileFilter: (req, file, cb)=>{
    const allowExt = ['image/png', 'image/jpg', 'image/webp'];
    if(allowExt.includes(file.mimetype)){
      cb(null, true);
    }else{
      const err = new Error('Extension not suported');
      cb(err, false);
    }
  }
});

module.exports = upload;