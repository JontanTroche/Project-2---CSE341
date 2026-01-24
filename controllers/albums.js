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

const createAlbum = async (req, res) => {
    const { title, releaseYear, type, tracklist, totalDuration, members } = req.body;

    if (!title || !releaseYear || !tracklist || !Array.isArray(tracklist)) {
        return res.status(400).json({ message: 'Title, releaseYear, and tracklist are required, and tracklist must be an array.' });
    }
    if (typeof releaseYear !== 'number' || releaseYear < 1989) {
        return res.status(400).json({ message: 'Release year must be a number and not less than 1989.' });
    }

    const album = {
        title,
        releaseYear,
        type,
        tracklist,
        totalDuration,
        members
    };

    try {
        const response = await mongodb.getDatabase().db().collection('albums').insertOne(album);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the album.' });
        }
    } catch (error) {
        console.error('Error creating album:', error);
        res.status(500).json({ message: error.message || 'Error creating the album.' });
    }
};

const updateAlbum = async (req, res) => {
    const albumId = req.params.id;
    const { title, releaseYear, type, tracklist, totalDuration, members } = req.body;

    if (title === undefined || releaseYear === undefined || tracklist === undefined) {
        return res.status(400).json({ message: 'Title, releaseYear, and tracklist are required for update.' });
    }
    if (typeof releaseYear !== 'number' || releaseYear < 1989) {
        return res.status(400).json({ message: 'Release year must be a number and not less than 1989.' });
    }
    if (!Array.isArray(tracklist)) {
        return res.status(400).json({ message: 'Tracklist must be an array.' });
    }

    const albumData = {
        title,
        releaseYear,
        type,
        tracklist,
        totalDuration,
        members
    };

    try {
        const response = await mongodb.getDatabase().db().collection('albums').replaceOne({ _id: new objectId(albumId) }, albumData);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Album not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating album:', error);
        res.status(500).json({ message: error.message || 'Error updating the album.' });
    }
};

const deleteAlbum = async (req, res) => {
    const albumId = req.params.id;

    try {
        const response = await mongodb.getDatabase().db().collection('albums').deleteOne({ _id: new objectId(albumId) });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ message: error.message || 'Error on server deleting the album.' });
    }
};

module.exports = {
    getAllAlbums,
    getOneAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
};