// servidor Express.
const cors = require('cors');
const express = require('express');

//módulos
const controller = require('./controller');
const repository = require('./repository/');

// autenticación - passport
//para generar archivo key y cert de https --> openssl req -nodes -new -x509 -keyout server.key -out server.cert
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// autenticación - jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET_KEY = "SECRET_KEY";

// 
const morgan = require('morgan');


const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

const app = express();

app.use(morgan(':method :host :status :res[content-length] - :response-time ms'));
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use('/', controller);


async function verify(username, password, done) {
    console.log('hola')
    const user = await repository.usersCol.findUser(username);

    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    if (await repository.usersCol.verifyPassword(user, password)) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}

passport.use(new BasicStrategy(verify));

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    const user = await repository.usersCol.findUser(payload.username);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
}));



module.exports = app;