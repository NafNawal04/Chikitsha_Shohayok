const db = require('../db');

const getDoctorsList = async (req, res) => {
    try {
     
        const doctors = await db.doctor.findMany(); 
        console.log('Doctors fetched from DB:', doctors);
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error loading doctors list.' });
    }
};

module.exports = { getDoctorsList };
