const response = require('../helpers/standardRespons');
const transactionsModel= require('../models/transactions');
const { validationResult}=require('express-validator');
//const errorResponse = require('../helpers/errorResponse');

//GET
exports.getAllTransactions = (req, res)=>{
  transactionsModel.getAllTransactions((results)=>{
    return response(res, 'message from standard response', results);
  });
};

//CREATE
exports.createTransactions = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), 400);
  }
  transactionsModel.createTransactions(req.body, (err, results)=>{
    return response(res, 'Create Transactions succesfully', results[0]);
  });
};

//UPDATE
exports.updateTransactions = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), 400);
  }
  const {id}=req.params;
  transactionsModel.updateTransactions(id, req.body, (err, results)=>{
    return response(res, 'Update Transactions succesfully', results[0]);
  });
};

//DELETE
exports.deleteTransactions = (req, res)=>{
  const {id}=req.params;
  transactionsModel.deleteTransactions(id, req.body, (results)=>{
    return response(res, 'Delete transaction successfully', results[0]);
  });
};

//GET DETAIL
exports.getDetailTransactions = (req, res)=>{
  const {id}=req.params;
  transactionsModel.getDetailTransactions(id, (results)=>{
    return response(res, 'detail transaction', results[0]);
  });
};