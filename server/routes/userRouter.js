const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/refresh',);
router.get('/auth', userController.auth);

router.get('/getUsers',userController.getUsers)

module.exports = router;
