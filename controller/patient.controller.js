const db = require('../db');

const getDashboard = async (req, res) => {
  try {
      const doctors = await db.doctor.findMany(); 

      for (const doctor of doctors) {
          doctor.comments = await db.comment.findMany({
              where: { doctorId: doctor.id },
              include: {
                  replies: true,  
                  user: true,     
              },
          });
      }

      res.json(doctors);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error loading doctors.' });
  }
};

const getDoctors = async (req, res) => {
  try {
      const doctors = await db.doctor.findMany();
      res.json(doctors);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch doctors' });
  }
};

const getComments = async (req, res) => {
  const { doctorId } = req.query;

  try {
      const comments = await db.comment.findMany({
          where: { doctorId },
          include: { user: true, replies: true }
      });
      res.json(comments);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comments' });
  }
};

const postComment = async (req, res) => {
  const { doctorId, content, parentId } = req.body;

  try {
      const comment = await db.comment.create({
          data: {
              content,
              doctorId,
              userId: req.user.id, 
              parentId: parentId || null
          }
      });
      res.json(comment);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error posting comment' });
  }
};

module.exports = {getDashboard, getDoctors, getComments, postComment};