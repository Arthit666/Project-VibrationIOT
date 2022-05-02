
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


//@route  POST http://localhost:8000/api/register
exports.createRegister = async (req,res)=>{

  const {username} = req.body;
  try {
    //check username
    let user = await User.findOne({username});
    if (user){
      return res.status(400).json({msg:'User already exists'})
    }
    //encryts
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPass;

    //create and res
    const newUser = new User(req.body);
    res.status(200).json(await newUser.save());

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//@route  POST http://localhost:8000/api/login
exports.login = async (req,res)=>{
  try {
    const user = await User.findOne({username: req.body.username})
    if(!user)
    {
        return res.status(400).json("wrong credentials")
    }
    //check password
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated)
    {
        return res.status(400).json("wrong credentials");
    }
      //patload return jsonwebtoken
      const payload = {
        user:{
          id: user._id,
          username: user.username,
          company: user.company,
          role: user.role,
          profilePic: user.profilePic
        }
    }
    jwt.sign(payload,'jwtSecret',
      {expiresIn : 3600}, // 3600minute
      (err,token) => {
        if (err) throw err;
        res.status(200).json({ token , payload})
      });

  } catch (error) {
    console.log(error)
    req.status(500).json(error)
  }
}

//@route  POST http://localhost:8000/api/current-user
exports.currentUser = async (req,res)=>{
    try {
      const user = await User.findOne({username: req.body.username}).select('-password');
      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      req.status(500).json(error)
    }

}