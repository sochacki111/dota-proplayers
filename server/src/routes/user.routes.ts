import { Router } from 'express';
import UsersController from '../controllers/users.controller';

const router = Router();

router.get('/fetch_data', UsersController.fetchProPlayers);

export default router;