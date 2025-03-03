const express = require('express');
const router = express.Router();
const path = require('path');

const { generateUserActivityReport } = require('../controller/adminReport.controller');


router.get('/admin/reports/user-activity/txt', generateUserActivityReport);

router.get('/admin/reports/download/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../reports', fileName);

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});


module.exports = router;