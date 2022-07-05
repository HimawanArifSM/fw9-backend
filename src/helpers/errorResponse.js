const response = require('./standardRespons');

const errorHandling = (msg, param, location='body')=>[
  {
    msg,
    param,
    location
  }
];

const errorResponse=(err, res)=>{
  if(err.code === '23505' && err.detail.includes('email')){
    const erres = errorHandling('Email already exist', 'email');
    return response(res, 'Error', erres, null, 400);
  }
  if(err.code === '23505' && err.detail.includes('username')){
    const erres = errorHandling('Username already used', 'username');
    return response(res, 'Error', erres, null, 400);
  }
  if(err.code === '23505' && err.detail.includes('phonenumber')){
    const erres = errorHandling('phonenumber already used', 'phonenumber');
    return response(res, 'Error', erres, null, 400);
  }
  if(err.code === '23505' && err.detail.includes('iduser')){
    const erres = errorHandling('iduser already used', 'iduser');
    return response(res, 'Error', erres, null, 400);
  }
  if(err.detail.includes('name')){
    const erres = errorHandling('name already used', 'name');
    return response(res, 'Error', erres, null, 400);
  }
  return response(res, 'Error', null, null, 400);
};

module.exports = errorResponse;