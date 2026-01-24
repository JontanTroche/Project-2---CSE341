const express = require('express');
const router = express.Router();
const membersController = require('../controllers/members');

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Members']
    next();
}, membersController.getAll);

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Members']
    next();
}, membersController.getSingle);

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Members']
    next();
}, membersController.createMember);

router.put('/:id', (req, res, next) => {
    // #swagger.tags = ['Members']
    next();
}, membersController.updateMember);

router.delete('/:id', (req, res, next) => {
    // #swagger.tags = ['Members']
    next();
}, membersController.deleteMember);

module.exports = router;