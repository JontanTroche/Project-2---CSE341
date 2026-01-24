const express = require('express');
const router = express.Router();
const albumsController = require('../controllers/albums');

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.getAllAlbums);

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.getOneAlbum);

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.createAlbum);

router.put('/:id', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.updateAlbum);

router.delete('/:id', (req, res, next) => {
    // #swagger.tags = ['Albums']
    next();
}, albumsController.deleteAlbum);

module.exports = router;