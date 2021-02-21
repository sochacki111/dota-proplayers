import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

router.post('/new', UsersController.register);
router.post('/login', UsersController.login);
router.get('/fetch_data', UsersController.fetchProPlayers);

export default router;