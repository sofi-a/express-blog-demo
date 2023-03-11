import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../src/models/user';

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    function (email, password, done) {
      User.authenticate(email, password)
        .then(({ user, token }) => {
          return done(null, { ...user, token });
        })
        .catch(done);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      User.findById(jwtPayload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch(done);
    }
  )
);

export default passport;
