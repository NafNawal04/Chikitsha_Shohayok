const db = require('../db');

const getDashboard = async (req, res) => {
    try {
        const doctors = await db.doctor.findMany(); 
        res.json(doctors); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error loading doctors.' });
    }
};

const bookAppointment = async (req, res) => {
    const { doctorId, appointmentDate } = req.body;

    try {

        const patientId = req.session.userId;
        if (!patientId) {
            throw new Error('Patient ID is missing in the session.');
        }

        const formattedDate = new Date(appointmentDate).toISOString();

        const appointmentCount = await db.appointment.count({
            where: {
                doctorId,
                appointmentDate: formattedDate,
            },
        });

        const serialNumber = appointmentCount + 1;

        await db.appointment.create({
            data: {
                patientId, 
                doctorId,
                appointmentDate: formattedDate,
                serialNumber,
            },
        });

        res.redirect('/patient/dashboard');
    } catch (error) {
        console.error('Error booking appointment:', error.message);
        res.status(500).send('Error booking appointment.');
    }
};



module.exports = {bookAppointment, getDashboard};