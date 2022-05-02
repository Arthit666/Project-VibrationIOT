const router = require('express').Router();
const { createRegister,login, currentUser } = require('../controller/auth');
const { auth } = require('../middleware/auth')

//@route  POST http://localhost:8000/api/register
router.post('/register',createRegister);

//@route  POST http://localhost:8000/api/login
router.post('/login',login)

//@route  POST http://localhost:8000/api/current-user
router.post('/current-user',auth,currentUser)

module.exports = router;