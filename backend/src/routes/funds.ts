import { Router } from 'express';
import { getFunds } from '../controllers/fundsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getFunds);

export default router;
