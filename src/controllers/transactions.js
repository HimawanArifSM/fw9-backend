const response = require('../helpers/standardRespons');

const transactionsModel= require('../models/transactions');

exports.getAllTransactions = (req, res)=>{
  transactionsModel.getAllTransactions((results)=>{
    return response(res, 'message from standard response', results);
  });
};

exports.createTransactions = (req, res)=>{
  transactionsModel.createTransactions(req.body, (results)=>{
    return response(res, 'Create Transactions succesfully', results[0]);
  });
};

exports.updateTransactions = (req, res)=>{
  const {id}=req.params;
  transactionsModel.updateTransactions(id, req.body, (results)=>{
    return response(res, 'Update Transactions succesfully', results[0]);
  });
};

exports.deleteTransactions = (req, res)=>{
  const {id}=req.params;
  transactionsModel.deleteTransactions(id, req.body, (results)=>{
    return response(res, 'Delete transaction successfully', results[0]);
  });
};

exports.getDetailTransactions = (req, res)=>{
  const {id}=req.params;
  transactionsModel.getDetailTransactions(id, (results)=>{
    return response(res, 'detail transaction', results[0]);
  });
};