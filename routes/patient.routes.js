const express = require('express');
const router = express.Router();
const path = require('path');
const patientController = require('../controller/patient.controller');

router.get('/patient/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/patientDashboard.html')); 
});

router.get('/patient/doctors', patientController.getDashboard);

router.get('/patient/doctors', patientController.getDoctors);

router.get('/doctor/comments', patientController.getComments);

router.post('/doctor/comments', patientController.postComment);



module.exports = router;
