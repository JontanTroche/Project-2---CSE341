const router = require("express").Router();
router.use('/', require('./swagger'));
const passport = require('passport');

router.use('/albums', require('./albums'));
router.use('/members', require('./members'));

router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.user = undefined;
        res.redirect('/');
    });
});

module.exports = router;