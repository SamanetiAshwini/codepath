import { db } from '../config/db.js';

export const createProblem = async (req, res, next) => {
  try {
    const { title, topic_id, difficulty, description, constraints, starter_code, solution_explanation, hints, topic_tags, test_cases } = req.body;

    if (!title || !topic_id || !description) {
      return res.status(400).json({
        success: false,
        error: 'title, topic_id, and description are required'
      });
    }

    const newProblem = db.createProblem({
      title,
      topic_id,
      difficulty,
      description,
      constraints,
      starter_code,
      solution_explanation,
      hints,
      topic_tags,
      test_cases
    });

    return res.status(201).json({
      success: true,
      message: 'Problem successfully created',
      problem: newProblem
    });
  } catch (err) {
    next(err);
  }
};

export const updateProblem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = db.updateProblem(id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    return res.json({
      success: true,
      message: 'Problem successfully updated',
      problem: updated
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProblem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteProblem(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Problem not found or already deleted' });
    }

    return res.json({
      success: true,
      message: `Problem ${id} deleted successfully`
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminStats = async (req, res, next) => {
  try {
    const stats = db.getPlatformStats();
    return res.json({
      success: true,
      stats
    });
  } catch (err) {
    next(err);
  }
};
