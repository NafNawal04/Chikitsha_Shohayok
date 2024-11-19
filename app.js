const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');


//const isAuthenticated = require('./middleware');
//app.use(isAuthenticated);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
}));

const port = 3000;
app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});


