const response = require('../helpers/standardRespons');
const userModel = require('../models/users');
const { validationResult}=require('express-validator');
const errorResponse = require('../helpers/errorResponse');

const{LIMIT_DATA}= process.env;

//GET ALL
exports.getAllUsers = (req, res)=>{
  const {searchBy='email', search='', sortBy='id', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;

  const offset = (page - 1) * limit;

  userModel.getAllUsers(searchBy ,search, sortBy, sorting, limit, offset, (err, results)=>{
    console.log(err);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    userModel.countAllUsers(searchBy, search, (err, totalData)=>{
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
exports.createUsers = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  userModel.createUsers(req.body, (err, results)=>{
    if(err){
      return errorResponse(err, res);
    }else{
      return response(res, 'Create user succesfully', results.rows);
    }   
  });
};

//UPDATE
exports.updateUsers = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  const {id}=req.params;
  userModel.updateUsers(id, req.body, (err, results)=>{
    if(err){
      return errorResponse(err, res);
    }
    else{
      return response(res, 'Update user succesfully', results[0]);
    }
  });
};

//DELETE
exports.deleteUsers = (req, res)=>{
  const {id}=req.params;
  userModel.deleteUsers(id, req.body, (results)=>{
    return response(res, 'Delete user successfully', results[0]);
  });
};

//GET DETAIL
exports.getDetailUsers = (req, res)=>{
  const {id}=req.params;
  userModel.getDetailUsers(id, (results)=>{
    if(results.rows.length > 0){
      return response(res, 'Detail user', results.rows[0]);
    }
    else{return res.redirect('/404');
    }
  });
};