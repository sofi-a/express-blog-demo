import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

import APIError from '../errors/api-error';

export default (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      new APIError({
        message: 'Validation error',
        errors: errors.array(),
        status: httpStatus.BAD_REQUEST,
      })
    );

  next();
};
