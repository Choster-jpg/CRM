const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.create)
router.get('/', productController.getAll);
router.put('/', productController.increment);
router.delete('/', productController.remove);

module.exports = router;