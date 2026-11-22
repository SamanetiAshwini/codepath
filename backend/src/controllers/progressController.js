import { db } from '../config/db.js';

export const getProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const progress = db.getUserProgress(userId);

    // Compute recommendation for next topic to study
    const allTopics = db.getTopics('dsa-path');
    const completedSet = new Set(progress.completedTopics || []);
    const recommendedTopic = allTopics.find(t => !completedSet.has(t.id)) || allTopics[0];

    return res.json({
      success: true,
      progress: {
        ...progress,
        recommendedTopic: {
          id: recommendedTopic.id,
          title: recommendedTopic.title,
          slug: recommendedTopic.slug,
          description: recommendedTopic.description,
          icon: recommendedTopic.icon
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const completeTopic = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { topicId } = req.body;

    if (!topicId) {
      return res.status(400).json({ success: false, error: 'topicId is required' });
    }

    const topic = db.getTopicById(topicId);
    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found' });
    }

    const record = db.completeTopic(userId, topic.id);
    return res.json({
      success: true,
      message: `Topic '${topic.title}' marked as completed!`,
      progress: record
    });
  } catch (err) {
    next(err);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const users = db.users.map(u => {
      const prog = db.getUserProgress(u.id);
      return {
        id: u.id,
        username: u.username,
        fullName: u.full_name,
        college: u.college,
        totalSolved: prog.totalSolved,
        streak: prog.currentStreak || u.streak,
        easySolved: prog.easySolved,
        mediumSolved: prog.mediumSolved,
        hardSolved: prog.hardSolved
      };
    }).sort((a, b) => b.totalSolved - a.totalSolved || b.streak - a.streak);

    return res.json({
      success: true,
      leaderboard: users.slice(0, 25)
    });
  } catch (err) {
    next(err);
  }
};
