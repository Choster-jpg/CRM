const Router = require('express');
const router = new Router();

const carrierRouter = require('./carrierRouter');
const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');
const supplyRouter = require('./supplyRouter');
const productRouter = require('./productRouter');

router.use('/carrier', carrierRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/supply', supplyRouter);
router.use('/product', productRouter);

module.exports = router;


