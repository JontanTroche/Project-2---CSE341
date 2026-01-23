const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllAlbums = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('albums').find();
    result.toArray().then((albums) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums);
    });
};

const getOneAlbum = async (req, res) => {
    const albumId = req.params.id;
    const result = await mongodb.getDatabase().db().collection('albums').findOne({ _id: new objectId(albumId) });
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Album not found' });
    }
};

module.exports = {
    getAllAlbums,
    getOneAlbum
};