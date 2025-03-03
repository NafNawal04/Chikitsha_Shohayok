const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      if (req.user) {
        req.session.isAuthenticated = true;
        res.redirect('/patient/dashboard');
        
      } else {
        res.redirect('/login');
      }
    }
  );
  

module.exports = router;