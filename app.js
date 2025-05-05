require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
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

passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
      scope: ['user:email']
    },
    async(accessToken, refreshToken, profile, done) => {
      try {

        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error("GitHub profile doesn't have an email."));
        }

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
    }
  )
);


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
        return done(null, false, { message: 'No password set. Please log in with Google or Github.' });
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



const signupRoutes = require('./routes/signup.routes.js');
const loginRoutes = require('./routes/login.routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const patientRoutes = require('./routes/patient.routes.js');
const reportRoutes = require('./routes/adminReport.routes.js');
const googleRoutes = require('./routes/googleAuth.routes.js');
const githubRoutes = require('./routes/githubAuth.routes.js');

app.use(ensureAuthenticated);

app.use(signupRoutes);
app.use(loginRoutes);
app.use(adminRoutes);
app.use(patientRoutes);
app.use(reportRoutes);
app.use(googleRoutes);
app.use(githubRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/landingPage.html')); 
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});


