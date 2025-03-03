const express = require('express');
const router = express.Router();
const path = require('path');

const { ensureAdmin } = require('../authMiddleware');
const { getDoctorsList } = require('../controller/seeDoctorList.controller.js');
const {uploadDoctorImage,renderAddDoctorPage,addDoctor,upload} = require('../controller/addDoctor.controller.js');  


router.get('/admin/dashboard', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/adminDashboard.html'));
});


router.get('/admin/dashboard/newDoctor', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/addNewDoctor.html'));
});

router.get('/admin/dashboard/seeDoctorList', ensureAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/seeDoctorList.html'));
});

router.get('/admin/add-doctor', renderAddDoctorPage);

router.post('/admin/add-doctor', upload.single('profileImage'), addDoctor);

router.post('/admin/upload-doctor-image', upload.single('profileImage'), uploadDoctorImage);

router.get('/admin/see-doctors-list', getDoctorsList);

module.exports = router;
