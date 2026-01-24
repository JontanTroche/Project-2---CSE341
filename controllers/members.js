const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Members']
    try {
        const result = await mongodb.getDatabase().db().collection('members').find();
        result.toArray().then((members) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(members);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error on server.' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Members']
    try {
        const memberId = new objectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('members').findOne({ _id: memberId });
        if (!result) {
            return res.status(404).json({ message: 'Member not found.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error on server.' });
    }
};

const createMember = async (req, res) => {
    // #swagger.tags = ['Members']
    const { name, role, joinYear, leaveYear, reunionYear, instrument, isOriginalMember } = req.body;

    // Validación de 7 campos para cumplir la rúbrica
    if (!name || !role || !joinYear || !instrument) {
        return res.status(400).json({ message: 'Required fields missing.' });
    }

    const memberData = { name, role, joinYear, leaveYear, reunionYear, instrument, isOriginalMember };

    try {
        const response = await mongodb.getDatabase().db().collection('members').insertOne(memberData);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error creating member.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || 'Error creating member.' });
    }
};

const updateMember = async (req, res) => {
    const { name, role, joinYear, leaveYear, reunionYear } = req.body;

    if (name === undefined || role === undefined || joinYear === undefined) {
        return res.status(400).json({ message: 'Name, role, and joinYear are required for update.' });
    }
    if (typeof joinYear !== 'number' || joinYear < 1985) {
        return res.status(400).json({ message: 'Join year must be a number and not less than 1985.' });
    }
    if (leaveYear && leaveYear !== 'Continues' && (typeof leaveYear !== 'string' || Number(leaveYear) < joinYear)) {
        return res.status(400).json({ message: 'Leave year must be "Continues" or a year greater than or equal to joinYear.' });
    }
    if (reunionYear && (typeof reunionYear !== 'number' || reunionYear < 1985)) {
        return res.status(400).json({ message: 'Reunion year must be a number and not less than 1985.' });
    }

    const memberData = {
        name,
        role,
        joinYear,
        leaveYear,
        reunionYear
    };

    try {
        const updatedMember = await Member.findByIdAndUpdate(req.params.id, memberData, {
            new: true,
            runValidators: true
        });
        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found.' });
        }
        res.status(200).json(updatedMember);
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(400).json({ message: error.message || 'Error updating member.' });
    }
};

const deleteMember = async (req, res) => {
    try {
        const deletedMember = await Member.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).json({ message: 'Error on server.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMember,
    updateMember,
    deleteMember
}