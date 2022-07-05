const response = require('../helpers/standardRespons');
const transtypeModel= require('../models/transtype');
const { validationResult}=require('express-validator');
const errorResponse = require('../helpers/errorResponse');
const{LIMIT_DATA}= process.env;

//GET
// exports.getAllTranstype = (req, res)=>{
//   transtypeModel.getAllTranstype((results)=>{
//     return response(res, 'message from standardresponse', results);
//   });
// };
//GET ALL
exports.getAllTranstype = (req, res)=>{
  const {search_by='name', search='', sortBy='id', sorting='ASC', limit=parseInt(LIMIT_DATA), page=1}= req.query;

  const offset = (page - 1) * limit;

  transtypeModel.getAllTranstype(search_by ,search, sortBy, sorting, limit, offset, (err, results)=>{
    console.log(err);
    if(results.length<1){
      return res.redirect('/404');
    }
    const pageInfo = {};
    transtypeModel.countAllTranstype(search_by, search, (err, totalData)=>{
      pageInfo.totalData= totalData;
      pageInfo.totalpage= Math.ceil(totalData/limit);
      pageInfo.currentpage= parseInt(page);
      pageInfo.nextPage= pageInfo.currentpage < pageInfo.totalpage ? pageInfo.currentpage + 1 : null;
      pageInfo.prevpage= pageInfo.currentpage > 1 ? pageInfo.currentpage - 1 : null;
      return response(res, 'list all transaction trypes', results, pageInfo);
    });
  });
};


//CREATE
exports.createTranstype = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  transtypeModel.createTranstype(req.body, (err, results)=>{
    //console.log(err);
    if(err){
      return errorResponse(err, res);
    }
    else{
      return response(res, 'Create profile succesfully', results[0]);
    }
  });
};

//UPDATE
exports.updateTranstype = (req, res)=>{
  const validation = validationResult(req);
  if(!validation.isEmpty()){
    return response(res, 'Error Ocured', validation.array(), null, 400);
  }
  const {id}=req.params;
  transtypeModel.updateTranstype(id, req.body, (err, results)=>{
    if(err){
      return errorResponse(err, res);
    }
    else{
      return response(res, 'Create profile succesfully', results[0]);
    }
  });
};

//DELETE
exports.deleteTranstype = (req, res)=>{
  const {id}=req.params;
  transtypeModel.deleteTranstype(id, req.body, (results)=>{
    return response(res, 'Delete transaction type successfully', results[0]);
  });
};

//GET DETAIL
exports.getDetailTranstype = (req, res)=>{
  const {id}=req.params;
  transtypeModel.getDetailTranstype(id, (results)=>{
    return response(res, 'detail transaction type', results[0]);
  });
};