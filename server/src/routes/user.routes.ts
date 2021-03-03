import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { jwtAuth } from '../middlewares/auth';
import validateRules from '../middlewares/validateRules';
import { registerValidator, loginValidator } from '../validators/validator';

const router = Router();

router.post(
  '/new',
  registerValidator(),
  validateRules,
  UsersController.register
);
router.post('/login', loginValidator(), validateRules, UsersController.login);
router.get('/fetch_data', jwtAuth, UsersController.fetchProPlayers);

export default router;
