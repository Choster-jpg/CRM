const express = require('express');
const {body} = require('express-validator');
const passport = require('passport');

const authMiddleware = require('../middleware/authMiddleware');
const guestMiddleware = require('../middleware/authMiddleware');
const config = require('../default.json');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.register);
router.post('/login',  userController.login);
router.post('/logout', authMiddleware(false) , userController.logout);
router.post('/reset',  userController.reset);
router.post('/reset/password', userController.resetPassword);
router.post('/info', authMiddleware(false), userController.setInfo)

router.get('/activate/:link',  userController.activate);
router.get('/reset/:link', );
router.get('/reset', )
router.get('/refresh', userController.refresh);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5000/api/user/sasi' }), (req, res) =>
{
    res.redirect(config.server.client_url);
})

router.get('/getUsers', authMiddleware(false), userController.getUsers);

router.get('/login', );
router.get('/register', );

module.exports = router;
