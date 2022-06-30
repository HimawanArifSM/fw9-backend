const response = require('../helpers/standardRespons');
const profilesModel= require('../models/profiles');
const { validationResult}=require('express-validator');
const errorResponse = require('../helpers/errorResponse');

//GET
exports.getAllProfiles = (req, res)=>{
  profilesModel.getAllProfiles((results)=>{
    return response(res, 'message from standardresponse', results);
  });
};

//CREATE
exports.createProfiles = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), 400);
  }
  profilesModel.createProfiles(req.body, (err, results)=>{
    //console.log(err);
    if(err){
      if(err.code === '23505' && err.detail.includes('phonenumber')){
        const erres = errorResponse('phonenumber already used', 'phonenumber');
        return response(res, 'Error', erres, 400);
      }else if(err.code === '23505' && err.detail.includes('iduser')){
        const erres = errorResponse('iduser already used', 'iduser');
        return response(res, 'Error', erres, 400);
      }
      return response(res, 'Create profile successfully', results[0]);
    }
    else{
      return response(res, 'Create profile succesfully', results[0]);
    }
  });
};

//UPDATE
exports.updateProfiles = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), 400);
  }
  const {id}=req.params;
  profilesModel.updateProfiles(id, req.body, (err, results)=>{
    if(err){
      if(err.code === '23505' && err.detail.includes('phonenumber')){
        const erres = errorResponse('phonenumber already used', 'phonenumber');
        return response(res, 'Error', erres, 400);
      }else if(err.code === '23505' && err.detail.includes('iduser')){
        const erres = errorResponse('iduser already used', 'iduser');
        return response(res, 'Error', erres, 400);
      }
      return response(res, 'Update profile successfully', results[0]);
    }
    else{
      return response(res, 'Update profile succesfully', results[0]);
    }
  });
};

//DELETE
exports.deleteProfiles = (req, res)=>{
  const {id}=req.params;
  profilesModel.deleteProfiles(id, req.body, (results)=>{
    return response(res, 'Delete profile successfully', results[0]);
  });
};

//GET DETAIL
exports.getDetailProfiles = (req, res)=>{
  const {id}=req.params;
  profilesModel.getDetailProfiles(id, (results)=>{
    return response(res, 'detail profile', results[0]);
  });
};