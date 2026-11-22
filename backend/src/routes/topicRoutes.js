import { Router } from 'express';
import { getLearningPaths, getTopics, getTopicDetail, getTopicLessons } from '../controllers/topicController.js';

const router = Router();

router.get('/paths', getLearningPaths);
router.get('/', getTopics);
router.get('/:id', getTopicDetail);
router.get('/:id/lessons', getTopicLessons);

export default router;
