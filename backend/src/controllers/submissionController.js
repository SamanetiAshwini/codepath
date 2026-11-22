import { db } from '../config/db.js';
import { ExecutionService } from '../services/executionService.js';

export const runCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;

    if (!problemId || !code) {
      return res.status(400).json({ success: false, error: 'Problem ID and code are required' });
    }

    const problem = db.getProblemById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    // Sample test cases only for test run
    const sampleCases = db.getTestCases(problem.id, false);

    const executionResult = await ExecutionService.run({
      language: language || 'python',
      code,
      testCases: sampleCases,
      problemId: problem.id
    });

    return res.json({
      success: true,
      ...executionResult
    });
  } catch (err) {
    next(err);
  }
};

export const submitCode = async (req, res, next) => {
  try {
    const { problemId, language, code } = req.body;
    const userId = req.user ? req.user.id : null;

    if (!problemId || !code) {
      return res.status(400).json({ success: false, error: 'Problem ID and code are required' });
    }

    const problem = db.getProblemById(problemId);
    if (!problem) {
      return res.status(404).json({ success: false, error: 'Problem not found' });
    }

    // Run against all test cases (both sample and hidden)
    const allTestCases = db.getTestCases(problem.id, true);

    const executionResult = await ExecutionService.run({
      language: language || 'python',
      code,
      testCases: allTestCases,
      problemId: problem.id
    });

    // Save submission to database
    const submissionRecord = db.createSubmission({
      userId,
      problemId: problem.id,
      language: language || 'python',
      code,
      status: executionResult.status,
      executionTimeMs: executionResult.executionTimeMs,
      memoryKb: executionResult.memoryKb,
      passedTestCases: executionResult.passedTestCases,
      totalTestCases: executionResult.totalTestCases,
      errorMessage: executionResult.errorMessage || null
    });

    return res.status(201).json({
      success: true,
      submission: submissionRecord,
      ...executionResult
    });
  } catch (err) {
    next(err);
  }
};

export const getSubmissionHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.query;

    const history = db.getUserSubmissions(userId, problemId);
    return res.json({
      success: true,
      count: history.length,
      submissions: history
    });
  } catch (err) {
    next(err);
  }
};
