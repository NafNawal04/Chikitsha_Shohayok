const db = require('../db');

const getDoctorsList = async (req, res) => {
  try {
    const doctors = await db.doctor.findMany({
      select: {
        name: true,
        specialization: true,
        bio: true, 
      },
    });
    res.json(doctors); 
  } catch (error) {
    console.error('Error loading doctors:', error.message);
    res.status(500).json({ error: 'Error loading doctors.' });
  }
};

module.exports = { getDoctorsList };
