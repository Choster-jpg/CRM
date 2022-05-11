const express = require('express');
const router = express.Router();
const carrierController = require('../controllers/carrierController');

router.post('/', carrierController.create);
router.get('/', carrierController.getAll);
router.delete('/', carrierController.remove);

module.exports = router;