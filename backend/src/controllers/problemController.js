import { db } from '../config/db.js';

export const getProblems = async (req, res, next) => {
  try {
    const { difficulty, topicId, search, tag } = req.query;
    const problems = db.getProblems({ difficulty, topicId, search, tag });

    // Return sanitized summary for listing
    const formatted = problems.map(p => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      topicId: p.topic_id,
      difficulty: p.difficulty,
      topicTags: p.topic_tags || [],
      acceptanceRate: p.acceptance_rate || 75.0,
      descriptionSnippet: (p.description || '').substring(0, 160) + '...'
    }));

    return res.json({
      success: true,
      count: formatted.length,
      problems: formatted
    });
  } catch (err) {
    next(err);
  }
};

export const getProblemDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const problem = db.getProblemById(id);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    // Get sample test cases for user display in editor
    const sampleTestCases = db.getTestCases(problem.id, false);

    return res.json({
      success: true,
      problem: {
        ...problem,
        sampleTestCases
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getProblemsByTopic = async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const problems = db.getProblems({ topicId });

    return res.json({
      success: true,
      topicId,
      count: problems.length,
      problems: problems.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        topicTags: p.topic_tags || [],
        acceptanceRate: p.acceptance_rate || 75.0
      }))
    });
  } catch (err) {
    next(err);
  }
};
