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
  
      const doctor = await db.doctor.findUnique({
        where: { id: doctorId },
      });
  
      if (!doctor) {
        throw new Error('Doctor not found.');
      }
  
      const schedule = JSON.parse(doctor.schedule);
      const appointmentDay = new Date(appointmentDate).toLocaleString('en-us', {
        weekday: 'long',
      });
  
      if (!schedule.days.includes(appointmentDay)) {
        throw new Error('Doctor is not available on this day.');
      }
  
      const appointmentTime = new Date(appointmentDate).toISOString();
      const appointmentCount = await db.appointment.count({
        where: {
          doctorId,
          appointmentDate: appointmentTime,
        },
      });
  
      const maxAppointmentsPerHour = 60 / schedule.appointmentDuration;
      const maxAppointments = maxAppointmentsPerHour * (schedule.endTime - schedule.startTime);
  
      if (appointmentCount >= maxAppointments) {
        throw new Error('No available slots for this time.');
      }
  
      const serialNumber = appointmentCount + 1;
  
      await db.appointment.create({
        data: {
          patientId,
          doctorId,
          appointmentDate: appointmentTime,
          serialNumber,
        },
      });
  
      res.redirect('/patient/dashboard');
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      res.status(500).send('Error booking appointment.');
    }
  };
  
const getComments = async (req, res) => {
    const { doctorId } = req.query;
  
    try {
      const comments = await prisma.comment.findMany({
        where: { doctorId, parentId: null },
        include: {
          replies: {
            include: {
              patient: { select: { name: true } },
            },
          },
          patient: { select: { name: true } },
        },
      });
  
      res.json(comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        patientName: comment.patient.name,
        replies: comment.replies.map(reply => ({
          id: reply.id,
          content: reply.content,
          patientName: reply.patient.name,
        })),
      })));
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Error fetching comments.' });
    }
};
  

const postComment = async (req, res) => {
    const { doctorId, content, parentId } = req.body;
    const patientId = req.session.userId;
  
    try {
      const newComment = await prisma.comment.create({
        data: {
          doctorId,
          patientId,
          content,
          parentId,
        },
      });
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ error: 'Error posting comment.' });
    }
};
  


module.exports = {bookAppointment, getDashboard, getComments, postComment};