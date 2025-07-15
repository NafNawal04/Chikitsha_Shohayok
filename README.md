# Chikitsha_Shohayok (চিকিৎসা সহায়ক)
*An Appointment Management System*

## 🏥 Project Overview

Chikitsha_Shohayok is a comprehensive web-based appointment management system that bridges the gap between patients and healthcare providers. The platform features dual dashboards for both patients and administrators, enabling efficient doctor profile management, patient feedback systems, and comprehensive reporting capabilities.

**Key Purpose:** To provide an efficient system for patients to search for doctors, view and provide feedback, while enabling administrators to manage the system and generate insightful reports.

## ✨ Features

### 👤 Patient Dashboard
- **Smart Search**: Search doctors by name or specialization
- **Doctor Profiles**: View detailed doctor information including specialization and bio
- **Interactive Comments**: Leave comments, reply to other patients' comments, and engage in nested discussions
- **User-Friendly Interface**: Intuitive design for seamless navigation

### 👨‍💼 Admin Dashboard
- **Doctor Management**: Add new doctors and edit existing profiles
- **Image Management**: Upload and update doctor profile images
- **Activity Reports**: Generate comprehensive user and doctor activity reports
- **System Overview**: Monitor platform usage and engagement

### 🔐 Authentication System
- **Multiple Login Options**: Email/password, Google OAuth, and GitHub OAuth
- **Secure Registration**: User signup with validation
- **Session Management**: Secure user sessions with Passport.js

### 📊 Reporting System
- **User Activity Reports**: Track patient engagement and comments
- **Doctor Activity Reports**: Monitor doctor profiles and feedback received
- **Downloadable Reports**: Generate reports in .txt format for offline analysis

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Responsive styling and layout
- **JavaScript**: Interactive client-side functionality

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Passport.js**: Authentication middleware
  - Local strategy for email/password
  - Google OAuth integration
  - GitHub OAuth integration

### Database
- **MongoDB**: NoSQL database for flexible data storage
- **Prisma ORM**: Modern database toolkit and query builder

### External APIs
- **Google OAuth**: Google Cloud Console integration
- **GitHub OAuth**: GitHub Developers platform integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NafNawal04/Chikitsha_Shohayok.git
   cd Chikitsha_Shohayok
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL="your_mongodb_connection_string"
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   SESSION_SECRET=your_session_secret
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the application**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📋 API Documentation

### Authentication Routes
- `GET /auth/google` - Google OAuth authentication
- `GET /auth/github` - GitHub OAuth authentication
- `POST /login` - User login
- `POST /signup` - User registration

### Patient Routes
- `GET /patient/dashboard` - Patient dashboard
- `GET /patient/doctors` - List all doctors
- `GET /doctor/comments?doctorId=` - Get doctor comments
- `POST /doctor/comments` - Post a comment

### Admin Routes
- `GET /admin/dashboard` - Admin dashboard
- `POST /admin/add-doctor` - Add new doctor
- `GET /admin/see-doctors-list` - View doctors list
- `POST /admin/upload-doctor-image` - Upload doctor image

### Reports
- `GET /admin/reports/user-activity/txt` - User activity report
- `GET /admin/reports/doctor-activity/txt` - Doctor activity report
- `GET /admin/reports/download/:filename` - Download reports

## 📱 Usage Examples

### For Patients
1. **Search for Doctors**: Use the search functionality to find doctors by name or specialization
2. **View Profiles**: Browse doctor profiles with detailed information
3. **Leave Feedback**: Share your experience through comments and replies
4. **Engage with Community**: Reply to other patients' comments and build discussions

### For Administrators
1. **Manage Doctors**: Add new doctors or update existing profiles
2. **Upload Images**: Keep doctor profiles current with recent photos
3. **Generate Reports**: Create activity reports for analysis
4. **Monitor System**: Track user engagement and platform usage

## 🔧 System Architecture

The application follows a traditional MVC pattern with:
- **Models**: Prisma schema definitions for User, Doctor, and Comment entities
- **Views**: HTML templates with dynamic content rendering
- **Controllers**: Express route handlers managing business logic
- **Middleware**: Authentication and session management

## 🔮 Future Enhancements

- **Enhanced Search**: Advanced filters for specialization, rating, and availability
- **Mobile Application**: Native mobile app for iOS and Android
- **Real-time Notifications**: Live updates for comments and replies
- **Appointment Booking**: Complete booking system with time slot management
- **Advanced Reporting**: Doctor schedule analysis and booking statistics
- **Rating System**: Doctor rating and review capabilities
- **Email Notifications**: Automated email alerts for appointments and updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Nafisa Nawal Moumita**
- GitHub: [@NafNawal04](https://github.com/NafNawal04)
