const router = require('express').Router();
const { createMachine, getAllMachine,getOneMachine, deleteMachine ,getStatusMachine ,updateMachine} =require('../controller/machine')
const { upload } = require('../middleware/uploadfile');

//@route  POST http://localhost:8000/api/machine/create
router.post('/machine/create',upload,createMachine);

//@route  GET ALL http://localhost:8000/api/machine
router.get('/machine',getAllMachine);

//@route  GET SATATUS http://localhost:8000/api/machine/status
router.get('/machine/status',getStatusMachine);

//@route  GET ONE http://localhost:8000/api/machin/id
router.get('/machine/:id',getOneMachine);

//@route  DELETE http://localhost:8000/api/machin/id
router.delete('/machine/:id',deleteMachine);

//@route  PUT http://localhost:8000/api/machin/id
router.put('/machine/:id',upload,updateMachine);


module.exports = router;