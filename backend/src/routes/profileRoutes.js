import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);

export default router;
