const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
app.set('trust proxy', 1);
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const MongoStore = require('connect-mongo').default;


const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: 'sessions'
        }),
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Request-With, Content-Type, Accept, z-key, Authorization'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        next();
    });

app
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'UPDATE'] }))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out") });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}),
    (req, res) => {
        console.log('--- Callback Reached ---');
        console.log('Passport User:', req.user);
        req.session.user = req.user;
        req.session.save((err) => {
            if (err) {
                console.error('Session Save Error:', err);
            }
            console.log('Session saved with user:', req.session.user);
            res.redirect('/');
        });
    });


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
        });
    }
});

