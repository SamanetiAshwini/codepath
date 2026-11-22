import { Router } from 'express';
import { runCode, submitCode, getSubmissionHistory } from '../controllers/submissionController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.post('/run', runCode);
router.post('/', optionalAuth, submitCode);
router.get('/history', authenticateToken, getSubmissionHistory);

export default router;
