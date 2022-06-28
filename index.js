//const { response } = require('express');
require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
  return res.json({
    success: true,
    message:'backend is running well',
  });
});

app.use('/', require('./src/routes'));

// app.post('/login', (req, res)=>{
//     //console.log(req.body)
//     console.log(req.query)
//     if(req.body.email === 'him@mail.com'&&req.body.password==="1234"){
//         return res.json({
//             success : true,
//             message: 'Login success'
//         })
//     }else{   
//         return res.json({
//         success: false,
//         message:'Login failed',
//     })}s
// })

app.use('*',(req, res)=>{
  return res.status(404).json({
    success: false,
    messasge: 'Resource not found'
  });
});

app.listen(process.env.PORT, ()=>{
  console.log('App is running on port 3333');
});