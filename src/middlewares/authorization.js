import APIError from '../errors/api-error';
import passport from '../../config/passport';

export default (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(
        new APIError({
          message: err?.message || info || 'Unauthorized',
          status: httpStatus.UNAUTHORIZED,
          isPublic: true,
        })
      );
    }

    req.user = user;
    next();
  })(req, res, next);
};
