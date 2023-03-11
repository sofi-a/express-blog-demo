import asyncHandler from 'express-async-handler';
import httpStatus from 'http-status';

import APIError from '../errors/api-error';
import User from '../models/user';
import passport from '../../config/passport';

export const login = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(
        new APIError({
          message: err?.message || info || 'Login failed',
          status: httpStatus.UNAUTHORIZED,
          isPublic: true,
        })
      );
    }

    req.login(user, { session: false }, (err) => {
      if (err)
        return next(
          new APIError({
            message: err?.message || 'Login failed',
            status: httpStatus.UNAUTHORIZED,
            isPublic: true,
          })
        );

      res.send(user);
    });
  })(req, res, next);
});

export const register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.register({ email, name, password });
  res.send(user);
});
