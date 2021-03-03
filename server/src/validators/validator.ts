import { body, check, ValidationChain } from 'express-validator';
import User from '../models/user';

// TODO Extract common factory function for reusing some chain base
export const registerValidator = (): ValidationChain[] => [
  body('email')
    .isEmail()
    .bail()
    .withMessage('email is not valid')
    .custom(
      async (value, { req }): Promise<boolean> => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject(new Error('email is already in use'));
        }

        return true;
      }
    ),
  body('password').isLength({ min: 5 }).withMessage('password too short')
];

export const loginValidator = (): ValidationChain[] => [
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .bail()
    .isEmail()
    .withMessage('email is not valid')
    .bail()
    .custom(
      async (value, { req }): Promise<boolean> => {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject(new Error('user does not exists'));
        }

        return true;
      }
    ),
  check('password').notEmpty().withMessage('pasword is required')
];
