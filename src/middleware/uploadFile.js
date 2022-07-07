const upload = require('../helpers/upload');
const response = require('../helpers/standardRespons');

const uploadFile = (req, res, next)=>{
  upload(req, res, function (err){
    if(err){
      return response(res, `Error ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports=uploadFile;