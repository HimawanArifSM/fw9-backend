const response = require('../helpers/standardRespons');

const transtypeModel= require('../models/transtype');

exports.getAllTranstype = (req, res)=>{
  transtypeModel.getAllTranstype((results)=>{
    return response(res, 'message from standardresponse', results);
  });
};

exports.createTranstype = (req, res)=>{
  transtypeModel.createTranstype(req.body, (results)=>{
    return response(res, 'Create transaction type succesfully', results[0]);
  });
};

exports.updateTranstype = (req, res)=>{
  const {id}=req.params;
  transtypeModel.updateTranstype(id, req.body, (results)=>{
    return response(res, 'Update transaction type succesfully', results[0]);
  });
};

exports.deleteTranstype = (req, res)=>{
  const {id}=req.params;
  transtypeModel.deleteTranstype(id, req.body, (results)=>{
    return response(res, 'Delete transaction type successfully', results[0]);
  });
};

exports.getDetailTranstype = (req, res)=>{
  const {id}=req.params;
  transtypeModel.getDetailTranstype(id, (results)=>{
    return response(res, 'detail transaction type', results[0]);
  });
};