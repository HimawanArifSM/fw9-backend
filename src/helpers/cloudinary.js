const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'duonjkaau', 
  api_key: '128569386852212', 
  api_secret: 'dAwFsYe-EoG_532vjICpD8CBKV4' 
});
module.exports = cloudinary;