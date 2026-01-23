const express = require('express');
const router = express.Router();

const albumsController = require('../controllers/albums');

router.get('/', albumsController.getAllAlbums);
router.get('/:id', albumsController.getOneAlbum);

module.exports = router;
