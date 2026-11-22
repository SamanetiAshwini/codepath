import { Router } from 'express';
import { createProblem, updateProblem, deleteProblem, getAdminStats } from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken, requireAdmin);

router.get('/stats', getAdminStats);
router.post('/problems', createProblem);
router.put('/problems/:id', updateProblem);
router.delete('/problems/:id', deleteProblem);

export default router;
