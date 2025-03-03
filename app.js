require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy; 
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const {ensureAuthenticated} = require('./authMiddleware.js');
const db = require('./db');


app.use(express.static('views'));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'your-secret-key', 
    resave: false,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await db.user.findUnique({
      where: { email: profile.emails[0].value }
    });

    if (!user) {
    
      const newUser = await db.user.create({
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null, 
        }
      });

      newUser.isNewUser = true; 
      return done(null, newUser);
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await db.user.findUnique({
        where: { email }
      });

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      if (!user.password) {
        return done(null, false, { message: 'No password set. Please log in with Google.' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


passport.serializeUser((user, done) => {
  console.log("Serializing user:", user); 
  done(null, user.email); 
});

passport.deserializeUser(async (email, done) => {
  console.log("Deserializing email:", email); 
  try {
    const user = await db.user.findUnique({ where: { email } });
    console.log("Deserialized user:", user); 
    done(null, user);
  } catch (err) {
    console.error("Error deserializing user:", err);
    done(err, null);
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user) {
      req.session.isAuthenticated = true;
      res.redirect('/patient/dashboard');
      
    } else {
      res.redirect('/login');
    }
  }
);


const signupRoutes = require('./routes/signup.routes.js');
const loginRoutes = require('./routes/login.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const patientRoutes = require('./routes/patient.routes.js');

app.use(ensureAuthenticated);

app.use(signupRoutes);
app.use(loginRoutes);
app.use(adminRoutes);
app.use(patientRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/landingPage.html')); 
});


const port = 3000;
app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});


