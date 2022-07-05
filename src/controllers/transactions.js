const response = require('../helpers/standardRespons');
const transactionsModel= require('../models/transactions');
const { validationResult}=require('express-validator');
//const errorResponse = require('../helpers/errorResponse');
const{LIMIT_DATA}= process.env;

//GET
// exports.getAllTransactions = (req, res)=>{
//   transactionsModel.getAllTransactions((results)=>{
//     return response(res, 'message from standard response', results);
//   });
// };
exports.getAllTransactions = (req, res)=>{
  const {search_by='sender_id', search='', sortBy='id', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;

  const offset = (page - 1) * limit;

  transactionsModel.getAllTransactions(search_by ,search, sortBy, sorting, limit, offset, (err, results)=>{
    console.log(err);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    transactionsModel.countAllTransactions(search_by, search, (err, totalData)=>{
      pageInfo.totalData= totalData;
      pageInfo.totalpage= Math.ceil(totalData/limit);
      pageInfo.currentpage= parseInt(page);
      pageInfo.nextPage= pageInfo.currentpage < pageInfo.totalpage ? pageInfo.currentpage + 1 : null;
      pageInfo.prevpage= pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
      return response(res, 'list all users', results, pageInfo);
    });
  });
};



//CREATE
exports.createTransactions = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  transactionsModel.createTransactions(req.body, (err, results)=>{
    return response(res, 'Create Transactions succesfully', results[0]);
  });
};

//UPDATE
exports.updateTransactions = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
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