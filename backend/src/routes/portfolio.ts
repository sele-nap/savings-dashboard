import { Router } from 'express';
import { getPortfolioSummary, getPortfolioHistory } from '../controllers/portfolioController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/summary', requireAuth, getPortfolioSummary);
router.get('/history', requireAuth, getPortfolioHistory);

export default router;
