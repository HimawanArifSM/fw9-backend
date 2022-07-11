//const { response } = require('express');
require('dotenv').config();

//const authMiddleware=require('./src/middleware/auth');
const express = require('express');

global.__basepath = __dirname;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static('assets'));

app.get('/', (req, res)=>{
  return res.json({
    success: true,
    message:'backend is running well',
  });
});

app.use('/', require('./src/routes'));

app.use('*',(req, res)=>{
  return res.status(404).json({
    success: false,
    messasge: 'Resource not found'
  });
});

app.listen(process.env.PORT, ()=>{
  console.log(`app is runing on port ${process.env.PORT}`);
});
