const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );
  
router.get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
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

