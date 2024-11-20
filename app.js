require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const {ensureAuthenticated} = require('./authMiddleware.js');


app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
}));


const signupRoutes = require('./routes/signup.routes.js');
const loginRoutes = require('./routes/login.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const patientRoutes = require('./routes/patient.routes.js');



app.use(signupRoutes);
app.use(loginRoutes);
app.use(adminRoutes);
app.use(patientRoutes);

app.use(ensureAuthenticated);


const port = 3000;
app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});


