import { db } from '../config/db.js';

export const getLearningPaths = async (req, res, next) => {
  try {
    const paths = db.getPaths();
    return res.json({ success: true, paths });
  } catch (err) {
    next(err);
  }
};

export const getTopics = async (req, res, next) => {
  try {
    const { pathId } = req.query;
    const topics = db.getTopics(pathId);
    return res.json({ success: true, topics });
  } catch (err) {
    next(err);
  }
};

export const getTopicDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = db.getTopicById(id);
    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }

    const lessons = db.getLessonsByTopic(topic.id);
    const problems = db.getProblems({ topicId: topic.id });

    return res.json({
      success: true,
      topic,
      lessons,
      problems: problems.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        acceptanceRate: p.acceptance_rate,
        topicTags: p.topic_tags
      }))
    });
  } catch (err) {
    next(err);
  }
};

export const getTopicLessons = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = db.getTopicById(id);
    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }

    const lessons = db.getLessonsByTopic(topic.id);
    return res.json({ success: true, topicTitle: topic.title, lessons });
  } catch (err) {
    next(err);
  }
};
