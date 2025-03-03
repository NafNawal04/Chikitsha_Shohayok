const fs = require('fs');
const path = require('path');
const db = require('../db');  

async function generateUserActivityReport(req, res) {
    try {
       
        const users = await db.user.findMany();
        const activeUsers = users.filter(user => {
            return user.lastLogin && new Date(user.lastLogin) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); 
        });

        const inactiveUsers = users.length - activeUsers.length;

        const reportContent = `
User Activity Report

Total Users: ${users.length}
Active Users (last 30 days): ${activeUsers.length}
Inactive Users (last 30 days): ${inactiveUsers}

Detailed Report:
Active Users:
${activeUsers.length > 0 ? activeUsers.map(user => `Name: ${user.name}, Email: ${user.email}`).join('\n') : 'No active users found in the last 30 days.'}

Inactive Users:
${inactiveUsers > 0 ? users.filter(user => !activeUsers.includes(user)).map(user => `Name: ${user.name}, Email: ${user.email}`).join('\n') : 'No inactive users found.'}
`;


        const filePath = path.join(__dirname, '../reports/user_activity_report.txt');
        fs.writeFileSync(filePath, reportContent);


        res.status(200).json({
            message: 'Report generated successfully',
            fileUrl: `/admin/reports/download/user_activity_report.txt`
        });

    } catch (err) {
        console.error('Error generating the report:', err);
        res.status(500).json({ message: 'Error generating user activity report' });
    }
}


async function generateDoctorActivityReport(req, res) {
    try {
        const doctors = await db.doctor.findMany({
            include: {
                comments: true  
            }
        });

        let reportData = `Doctor Activity Report\n\n`;

        doctors.forEach(doctor => {
            const doctorComments = doctor.comments ? doctor.comments.length : 0;
            reportData += `Doctor Name: ${doctor.name}\n`;
            reportData += `Specialization: ${doctor.specialization}\n`;
            reportData += `Comments: ${doctorComments}\n\n`;
        });

        const filePath = path.join(__dirname, '../reports/doctor_activity_report.txt');
        fs.writeFileSync(filePath, reportData);


        res.status(200).json({
            message: 'Report generated successfully',
            fileUrl: `/admin/reports/download/doctor_activity_report.txt`
        });

    } catch (err) {
        console.log('Cannot generate doctors report', err);
        res.status(500).json({ message: 'Error generating Doctor Activity Report' });
    }
}


module.exports = { generateUserActivityReport, generateDoctorActivityReport };
