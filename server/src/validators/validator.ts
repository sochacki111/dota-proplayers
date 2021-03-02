import {
  body,
  ValidationChain
} from 'express-validator';

const userValidationRules = (): ValidationChain[] => [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).withMessage('password too short')
];

export default userValidationRules;