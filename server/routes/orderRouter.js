const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');

router.get('/', ordersController.getAll);
router.post('/', ordersController.create)
router.put('/', ordersController.setInProcess)
router.delete('/', ordersController.remove);

module.exports = router;