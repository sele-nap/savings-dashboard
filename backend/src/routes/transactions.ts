import { Router } from 'express';
import { getTransactions, createTransaction } from '../controllers/transactionsController';
import { validateTransaction } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, getTransactions);
router.post('/', requireAuth, validateTransaction, createTransaction);

export default router;
