import { Router } from 'express';
import { askMentor } from '../controllers/aiController.js';

const router = Router();

router.post('/ask', askMentor);

export default router;
