const router = require("express").Router();
router.use('/', require('./swagger'));

router.get("/", (req, res) => {
    // #swagger.tags = ['Hello world']
    res.send("Hello World!");
});

router.use('/albums', require('./albums'));
router.use('/members', require('./members'));

module.exports = router;