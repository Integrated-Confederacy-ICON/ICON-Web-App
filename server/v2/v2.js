const express = require('express');
const rateLimit = require('express-rate-limit');

const memberRoutes = require('./api/routes/memberRoutes.js');
const authRoutes = require('./api/routes/authRoutes.js');
const paymentRoutes = require('./api/routes/paymentRoutes.js');

const v2Routes = express.Router();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    standardHeaderes: true,
    legacyHeaderes: false,
    message: 'Too many requests from this IP, please try again later'
})

v2Routes.use(limiter);

v2Routes.get('/health',(req, res) => {
    res.status(200).json({message: 'API is healthy'});
});

v2Routes.use('/members', memberRoutes);
v2Routes.use('/auth', authRoutes);
v2Routes.use('/payments', paymentRoutes);


module.exports = v2Routes;