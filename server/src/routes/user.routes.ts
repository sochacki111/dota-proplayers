import { Router } from 'express';
import { body } from 'express-validator';
import UsersController from '../controllers/users.controller';
import { jwtAuth } from '../middlewares/auth';
import validateRules from '../middlewares/validateRules';
import userValidationRules from '../validators/validator';

const router = Router();

router.post('/new', userValidationRules(), validateRules, UsersController.register);
router.post('/login', UsersController.login);
router.get('/fetch_data', jwtAuth, UsersController.fetchProPlayers);

export default router;
