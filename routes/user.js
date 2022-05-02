const router = require('express').Router();
const { getUser , updateUser, deleteUser} = require('../controller/user');
////
const { upload } = require('../middleware/uploadfile');

//@route  POST http://localhost:8000/api/user/:id
router.get('/user/:id',getUser);

//@route  PUT http://localhost:8000/api/user/:id
router.put('/user/:id',upload,updateUser);

//@route  DELETE http://localhost:8000/api/user/:id
router.delete('/user/:id',deleteUser);

module.exports = router