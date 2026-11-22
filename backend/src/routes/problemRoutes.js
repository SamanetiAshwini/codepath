import { Router } from 'express';
import { getProblems, getProblemDetail, getProblemsByTopic } from '../controllers/problemController.js';

const router = Router();

router.get('/', getProblems);
router.get('/topic/:topicId', getProblemsByTopic);
router.get('/:id', getProblemDetail);

export default router;
