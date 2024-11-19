const express = require('express');
const path = require('path');
const router = express.Router();
const signupController = require('../controller/signup.controller.js'); 

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html')); 
});

router.post('/signup', signupController.handleSignup);

module.exports = router;