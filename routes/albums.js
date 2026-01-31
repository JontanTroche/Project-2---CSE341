const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.getAllAlbums);

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.getOneAlbum);

router.post('/', isAuthenticated, (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.createAlbum);

router.put('/:id', isAuthenticated, (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.updateAlbum);

router.delete('/:id', isAuthenticated, (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.deleteAlbum);

module.exports = router;