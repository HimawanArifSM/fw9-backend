const response = require('../helpers/standardRespons');
const profilesModel= require('../models/profiles');
const { validationResult}=require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const{LIMIT_DATA}= process.env;

//GET
// exports.getAllProfiles = (req, res)=>{
//   profilesModel.getAllProfiles((results)=>{
//     return response(res, 'message from standardresponse', results);
//   });
// };
exports.getAllProfiles = (req, res)=>{
  const {seacrh_by='fullname', search='', sortBy='id', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;

  const offset = (page - 1) * limit;

  profilesModel.getAllProfiles(seacrh_by ,search, sortBy, sorting, limit, offset, (err, results)=>{
    console.log(err);
    console.log(res);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    profilesModel.countAllProfiles(seacrh_by, search, (err, totalData)=>{
      pageInfo.totalData= totalData;
      pageInfo.totalpage= Math.ceil(totalData/limit);
      pageInfo.currentpage= parseInt(page);
      pageInfo.nextPage= pageInfo.currentpage < pageInfo.totalpage ? pageInfo.currentpage + 1 : null;
      pageInfo.prevpage= pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
      return response(res, 'list all profiles', results, pageInfo);
    });
  });
};
//CREATE
exports.createProfiles = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  profilesModel.createProfiles(req.body, (err, results)=>{
    console.log(err);
    if(err){
      return errorResponse(err, res);
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
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  const {id}=req.params;
  profilesModel.updateProfiles(id, req.body, (err, results)=>{
    if(err){
      return errorResponse(err, res);
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