const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const secretOrKey = process.env.secretOrKey;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
},(jwtPayload, done) => {
   console.log(jwtPayload)
   User.findOne({ username: jwtPayload.username }).then((user) => {
      if (user){
        console.log('success');
        return done(null, user);
      } else {
        console.log('error');
        return done(err, false);
      }
   }) 
   .catch((err) => {
      return done(err, false)
   });
 }
))