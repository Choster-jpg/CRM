const express = require('express');
const router = express.Router();

const supplyController = require('../controllers/supplyController');

router.get('/', supplyController.getAll);
router.post('/', supplyController.create);

module.exports = router;