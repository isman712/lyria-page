const passport = require('passport');
const { GOOGLE_AUTH_ID, GOOGLE_AUTH_SECRET, URL, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = require('../config/config');
const scope = ["identify", "email"]

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Strategy } = require("passport-discord");

passport.use(new GoogleStrategy({
    clientID: GOOGLE_AUTH_ID,
    clientSecret: GOOGLE_AUTH_SECRET,
    callbackURL: URL + '/auth/google',
    scope: ["profile", "email"]
  },
  function(a, r, profile, cb) {
    process.nextTick(() => {
      return cb(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use( new Strategy({
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: URL + "/auth/discord",
      scope,
    },
    (a, r, profile, cb) => {
      process.nextTick(() => {
        return cb(null, profile);
      });
    }
  )
);

module.exports = passport