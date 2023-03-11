import { body } from 'express-validator';

// strong password with at least 8 characters, one uppercase letter, one lowercase letter, and one number
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const login = [
  body('email')
    .isEmail()
    .toLowerCase()
    .withMessage('Please enter a valid email address'),
  body('password').isString().notEmpty().withMessage('Password is required'),
];

export const register = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email')
    .isEmail()
    .toLowerCase()
    .withMessage('Please enter a valid email address'),
  body('password')
    .custom((value) => strongPasswordRegex.test(value))
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
    ),
];
