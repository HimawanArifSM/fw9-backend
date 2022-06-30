const response = require('../helpers/standardRespons');
const userModel = require('../models/users');
const { validationResult}=require('express-validator');
const errorResponse = require('../helpers/errorResponse');

//GET ALL
exports.getAllUsers = (req, res)=>{
  userModel.getAllUsers((results)=>{
    return response(res, 'message from standard response', results);
  });
};

//CREATE
exports.createUsers = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), 400);
  }
  userModel.createUsers(req.body, (err, results)=>{
    if(err){
      if(err.code === '23505' && err.detail.includes('email')){
        const erres = errorResponse('Email already exist', 'email');
        return response(res, 'Error', erres, 400);
      }else if(err.code === '23505' && err.detail.includes('username')){
        const erres = errorResponse('Username already used', 'username');
        return response(res, 'Error', erres, 400);
      }
      return response(res, 'Create user successfully', results[0]);
    }else{
      return response(res, 'Create user succesfully', results[0]);
    }   
  });
};

//UPDATE
exports.updateUsers = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), 400);
  }
  const {id}=req.params;
  userModel.updateUsers(id, req.body, (err, results)=>{
    if(err){
      if(err.code === '23505' && err.detail.includes('email')){
        const erres = errorResponse('Email already exist', 'email');
        return response(res, 'Error', erres, 400);
      }else if(err.code === '23505' && err.detail.includes('username')){
        const erres = errorResponse('Username already used', 'username');
        return response(res, 'Error', erres, 400);
      }
      return response(res, 'Create user successfully', results[0]);
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
    return response(res, 'detail user', results[0]);
  });
};