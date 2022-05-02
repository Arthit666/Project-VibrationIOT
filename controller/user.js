const User = require('../models/User');
const fs = require('fs')

//@route  GET http://localhost:8000/api/user/id
exports.getUser = async (req,res)=>{
   try {
     const user = await User.findById(req.params.id)
     const {password , ...other} = user._doc;
     res.status(200).json(other);
   } catch (error) {
     console.log(error)
     res.status(500).json(error)
   }
}

//@route  PUT http://localhost:8000/api/user/id
exports.updateUser = async (req,res)=>{
  try {
    const { username,email,company,filenameold,filename } = req.body;
    console.log(req.body)
    var newData = {
      username,
      email,
      company,
      profilePic: filenameold
    }
    if(typeof req.file != 'undefined'){
      newData.profilePic = req.file.filename;
      if(filenameold != 'defaultimage.jpg'){
        await fs.unlink(`./public/uploads/${filenameold}`,(err)=>{
          if(err){
            console.log(err)
          }else{
            console.log('remove file success')
          }
        })
      }
    }
    const updated = await User.findOneAndUpdate({_id: req.params.id},
      newData,
      {new: true}
    );
    res.json(updated);
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

//@route  DELETE http://localhost:8000/api/user/id
exports.deleteUser= async(req,res) =>{
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (user.profilePic != "defaultimage.jpg") {
      await fs.unlink(`./public/uploads/${user.profilePic}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("remove file success");
        }
      });
    }
    res.status(200).json("User has been deleted..");
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}