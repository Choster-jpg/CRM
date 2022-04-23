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
router.post('/logout', authMiddleware(false) , userController.logout);
router.post('/reset', userController.reset);
router.post('/reset/password', userController.resetPassword);

router.get('/activate/:link', userController.activate);
router.get('/reset/:link', );
router.get('/refresh', userController.refresh);
router.get('/auth/google', );

router.get('/getUsers', authMiddleware(false), userController.getUsers);

router.get('/login', );
router.get('/register', );

module.exports = router;
