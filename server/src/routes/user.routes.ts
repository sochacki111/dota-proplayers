import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { jwtAuth } from '../middlewares/auth';

const router = Router();

router.post('/new', UsersController.register);
router.post('/login', UsersController.login);
router.get('/fetch_data', jwtAuth, UsersController.fetchProPlayers);

export default router;
