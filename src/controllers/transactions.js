const response = require('../helpers/standardRespons');

const transactionsModel= require('../models/transactions');

exports.getAllTransactions = (req, res)=>{
  transactionsModel.getAllTransactions((results)=>{
    return response(res, 'message from standard response', results);
  });
};

// const response = require('../helpers/standardRespons');

// const userModel = require('../models/users');

// exports.getAllUsers = (req, res)=>{
//   userModel.getAllUsers((results)=>{
//     return response(res, 'message from standard response', results);
//   });
// };