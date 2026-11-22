import { AiMentorService } from '../services/aiService.js';

export const askMentor = async (req, res, next) => {
  try {
    const { problemId, userCode, language, promptType, question } = req.body;

    const guidance = await AiMentorService.askMentor({
      problemId,
      userCode,
      language,
      promptType,
      question
    });

    return res.json({
      success: true,
      ...guidance
    });
  } catch (err) {
    next(err);
  }
};
