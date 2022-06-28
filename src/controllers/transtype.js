const response = require('../helpers/standardRespons');

const transtypeModel= require('../models/transtype');

exports.getAllTranstype = (req, res)=>{
  transtypeModel.getAllTranstype((results)=>{
    return response(res, 'message from standardresponse', results);
  });
};