const express = require('express');
const router = express.Router();
const path = require('path');

const { ensureAdmin } = require('../authMiddleware');


router.get('/admin/dashboard', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/adminDashboard.html'));
});

module.exports = router;
