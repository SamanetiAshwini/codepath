import { Router } from 'express';
import { getProgress, completeTopic, getLeaderboard } from '../controllers/progressController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, getProgress);
router.post('/complete-topic', authenticateToken, completeTopic);
router.get('/leaderboard', getLeaderboard);

export default router;
