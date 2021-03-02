import { matchedData, validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateRules = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // req.matchedData = matchedData(req);
    return next();
  }

  // const extractedErrors: ValidationError[] = [];
  const extractedErrors: any = [];
  // errors.array().map((err) => extractedErrors.push(err));
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

export default validateRules;
