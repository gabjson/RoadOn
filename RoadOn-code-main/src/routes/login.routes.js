const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/login', (req, res, next) => {
    if (req.query.fail)
        res.render('login.ejs', { fail: true, success: false, logged: true, title: 'RoadOn - Login' });
    else if (req.query.success)
        res.render('login.ejs', { fail: false, success: true, logged: true, title: 'RoadOn - Login' });
    else if (req.query.logged)
        res.render('login.ejs', { fail: false, success: true, logged: false, title: 'RoadOn - Login' });
    else
        res.render('login.ejs', { fail: false, success: false, logged: true, title: 'RoadOn - Login' });
});

/* POST login page */
router.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/index', 
        failureRedirect: '/login?fail=true' 
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      // Don't redirect, just print text
      res.redirect('/')
    });
  });

module.exports = router;