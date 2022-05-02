const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = (req,res,next)=>{
  const token = req.body.token;
  if(!token){
    return res.status(401).json({msg: 'No token'});
  }
  //verify token
  try{
    const decode = jwt.verify(token,'jwtSecret'); //decode to data
    req.body.username = decode.user.username
    next();
  }catch{
    res.status(401).json({msg: 'Token not valid'})
  }
}