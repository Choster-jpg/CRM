const express = require('express');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register);

router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/auth', userController.auth);
router.get('/auth/google', )

router.get('/getUsers', authMiddleware, userController.getUsers);

module.exports = router;
