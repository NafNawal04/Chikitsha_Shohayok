const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });

const renderAddDoctorPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/addNewDoctor.html'));  
};

const addDoctor = async (req, res) => {
    const { name, bio, specialization, schedule, roomNumber } = req.body;
    const profileImage = req.file ? req.file.filename : null;  

    try {
        await prisma.doctor.create({
            data: {
                name,
                bio,
                specialization,
                schedule,
                roomNumber,
                profileImage,
            }
        });
        res.redirect('/admin/dashboard'); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving the doctor.');
    }
};

const uploadDoctorImage = async (req, res) => {
    const { doctorId } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    if (!doctorId || !profileImage) {
        return res.status(400).json({ success: false, message: 'Doctor ID or image not provided' });
    }

    try {
        const updatedDoctor = await prisma.doctor.update({
            where: { id: doctorId },
            data: { profileImage },
        });

        res.status(200).json({ success: true, imageUrl: `/uploads/${profileImage}` });
    } catch (error) {
        console.error('Error updating doctor image:', error);
        res.status(500).json({ success: false, message: 'Error updating doctor image' });
    }
};

module.exports = {renderAddDoctorPage,addDoctor,upload,uploadDoctorImage};
