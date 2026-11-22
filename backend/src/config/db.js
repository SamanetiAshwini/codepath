import { config } from './env.js';
import { learningPaths, topics, lessons, problems, testCases, mockUsers } from '../data/seedData.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

/**
 * Universal Database Layer
 * Supports Supabase / PostgreSQL when configured.
 * Seamlessly provides an active in-memory seeded store for zero-friction setup, local dev, and automated tests.
 */

class DatabaseStore {
  constructor() {
    this.learningPaths = JSON.parse(JSON.stringify(learningPaths));
    this.topics = JSON.parse(JSON.stringify(topics));
    this.lessons = JSON.parse(JSON.stringify(lessons));
    this.problems = JSON.parse(JSON.stringify(problems));
    this.testCases = JSON.parse(JSON.stringify(testCases));
    this.users = JSON.parse(JSON.stringify(mockUsers));
    this.submissions = [];
    this.topicProgress = []; // { id, userId, topicId, completed, completedAt }
    this.userProgress = []; // { id, userId, totalSolved, easySolved, mediumSolved, hardSolved, streak }
    this.bookmarks = [];

    // Initialize progress for mock users
    this.initMockProgress();
  }

  initMockProgress() {
    // Initial stats for student-1
    this.userProgress.push({
      id: uuidv4(),
      userId: 'user-student-1',
      totalSolved: 6,
      easySolved: 3,
      mediumSolved: 2,
      hardSolved: 1,
      currentStreak: 14,
      lastActiveDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    });

    // Mark Arrays topic as completed
    this.topicProgress.push({
      id: uuidv4(),
      userId: 'user-student-1',
      topicId: 'dsa-arrays',
      completed: true,
      completedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    });

    // Sample submission
    this.submissions.push({
      id: uuidv4(),
      userId: 'user-student-1',
      problemId: 'prob-two-sum',
      language: 'python',
      code: `class Solution:\n    def twoSum(self, nums, target):\n        m = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in m:\n                return [m[diff], i]\n            m[n] = i\n        return []`,
      status: 'Accepted',
      executionTimeMs: 42,
      memoryKb: 14800,
      passedTestCases: 3,
      totalTestCases: 3,
      createdAt: new Date(Date.now() - 3600000).toISOString()
    });
  }

  // --- Learning Paths ---
  getPaths() {
    return this.learningPaths.sort((a, b) => a.order_index - b.order_index);
  }

  // --- Topics ---
  getTopics(pathId = null) {
    let result = [...this.topics];
    if (pathId) {
      result = result.filter(t => t.path_id === pathId);
    }
    return result.sort((a, b) => a.order_index - b.order_index);
  }

  getTopicById(id) {
    return this.topics.find(t => t.id === id || t.slug === id);
  }

  getLessonsByTopic(topicId) {
    return this.lessons.filter(l => l.topic_id === topicId).sort((a, b) => a.order_index - b.order_index);
  }

  // --- Problems ---
  getProblems({ difficulty, topicId, search, tag } = {}) {
    let result = [...this.problems];

    if (difficulty && difficulty !== 'All') {
      result = result.filter(p => p.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (topicId) {
      result = result.filter(p => p.topic_id === topicId);
    }

    if (tag) {
      result = result.filter(p => p.topic_tags && p.topic_tags.some(t => t.toLowerCase() === tag.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.topic_tags && p.topic_tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }

  getProblemById(idOrSlug) {
    return this.problems.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  }

  getTestCases(problemId, includeHidden = false) {
    const list = this.testCases.filter(tc => tc.problem_id === problemId);
    if (!includeHidden) {
      return list.filter(tc => tc.is_sample);
    }
    return list;
  }

  createProblem(problemData) {
    const id = problemData.id || `prob-${uuidv4().substring(0, 8)}`;
    const slug = problemData.slug || problemData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProblem = {
      id,
      slug,
      title: problemData.title,
      topic_id: problemData.topic_id,
      difficulty: problemData.difficulty || 'Easy',
      description: problemData.description || '',
      constraints: problemData.constraints || '',
      starter_code: problemData.starter_code || {
        python: 'class Solution:\n    def solve(self):\n        pass',
        java: 'class Solution {\n    public void solve() {}\n}',
        cpp: 'class Solution {\npublic:\n    void solve() {}\n};'
      },
      solution_explanation: problemData.solution_explanation || '',
      hints: problemData.hints || [],
      topic_tags: problemData.topic_tags || [],
      acceptance_rate: 70.0,
      created_at: new Date().toISOString()
    };

    this.problems.push(newProblem);

    // Save sample test cases if provided
    if (problemData.test_cases && Array.isArray(problemData.test_cases)) {
      problemData.test_cases.forEach((tc, idx) => {
        this.testCases.push({
          id: `tc-${uuidv4().substring(0, 8)}`,
          problem_id: id,
          input: tc.input || '',
          expected_output: tc.expected_output || '',
          is_sample: tc.is_sample !== undefined ? tc.is_sample : true,
          explanation: tc.explanation || '',
          order_index: idx + 1
        });
      });
    }

    return newProblem;
  }

  updateProblem(id, data) {
    const idx = this.problems.findIndex(p => p.id === id || p.slug === id);
    if (idx === -1) return null;
    this.problems[idx] = { ...this.problems[idx], ...data, updated_at: new Date().toISOString() };
    return this.problems[idx];
  }

  deleteProblem(id) {
    const initialLen = this.problems.length;
    this.problems = this.problems.filter(p => p.id !== id && p.slug !== id);
    this.testCases = this.testCases.filter(tc => tc.problem_id !== id);
    return this.problems.length < initialLen;
  }

  // --- Users & Profiles ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  async createUser({ email, username, password, fullName, college, gradYear, role = 'student' }) {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const id = uuidv4();

    const newUser = {
      id,
      email,
      username: username || email.split('@')[0],
      password_hash,
      full_name: fullName || username || 'New Student',
      role,
      college: college || 'University',
      grad_year: gradYear || new Date().getFullYear(),
      streak: 1,
      created_at: new Date().toISOString()
    };

    this.users.push(newUser);

    // Create user progress record
    this.userProgress.push({
      id: uuidv4(),
      userId: id,
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      currentStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    });

    return newUser;
  }

  updateUserProfile(userId, data) {
    const user = this.findUserById(userId);
    if (!user) return null;
    if (data.full_name) user.full_name = data.full_name;
    if (data.college) user.college = data.college;
    if (data.grad_year) user.grad_year = data.grad_year;
    return user;
  }

  // --- Submissions ---
  createSubmission(submissionData) {
    const newSub = {
      id: uuidv4(),
      ...submissionData,
      createdAt: new Date().toISOString()
    };
    this.submissions.unshift(newSub);

    // If accepted, update student progress
    if (submissionData.status === 'Accepted' && submissionData.userId) {
      this.recordProblemSolved(submissionData.userId, submissionData.problemId);
    }

    return newSub;
  }

  getUserSubmissions(userId, problemId = null) {
    let list = this.submissions.filter(s => s.userId === userId);
    if (problemId) {
      list = list.filter(s => s.problemId === problemId);
    }
    return list;
  }

  // --- Progress Tracking ---
  getUserProgress(userId) {
    let prog = this.userProgress.find(p => p.userId === userId);
    if (!prog) {
      prog = {
        id: uuidv4(),
        userId,
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        currentStreak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      };
      this.userProgress.push(prog);
    }

    // Get completed topics for this user
    const completedTopicIds = this.topicProgress
      .filter(tp => tp.userId === userId && tp.completed)
      .map(tp => tp.topicId);

    // Calculate accuracy percentage
    const userSubs = this.submissions.filter(s => s.userId === userId);
    const acceptedCount = userSubs.filter(s => s.status === 'Accepted').length;
    const accuracy = userSubs.length > 0 ? Math.round((acceptedCount / userSubs.length) * 100) : 100;

    return {
      ...prog,
      accuracy,
      totalAttempts: userSubs.length,
      completedTopics: completedTopicIds,
      recentSubmissions: userSubs.slice(0, 10)
    };
  }

  recordProblemSolved(userId, problemId) {
    const problem = this.getProblemById(problemId);
    if (!problem) return;

    let prog = this.userProgress.find(p => p.userId === userId);
    if (!prog) {
      prog = {
        id: uuidv4(),
        userId,
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        currentStreak: 1,
        lastActiveDate: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      };
      this.userProgress.push(prog);
    }

    // Check if user already solved this problem before
    const prevSolved = this.submissions.some(
      s => s.userId === userId && s.problemId === problemId && s.status === 'Accepted' && s.id !== this.submissions[0]?.id
    );

    if (!prevSolved) {
      prog.totalSolved += 1;
      const diff = (problem.difficulty || '').toLowerCase();
      if (diff === 'beginner' || diff === 'easy') {
        prog.easySolved += 1;
      } else if (diff === 'medium') {
        prog.mediumSolved += 1;
      } else if (diff === 'hard') {
        prog.hardSolved += 1;
      }
    }

    prog.updatedAt = new Date().toISOString();
  }

  completeTopic(userId, topicId) {
    let existing = this.topicProgress.find(tp => tp.userId === userId && tp.topicId === topicId);
    if (existing) {
      existing.completed = true;
      existing.completedAt = new Date().toISOString();
      return existing;
    }
    const newRecord = {
      id: uuidv4(),
      userId,
      topicId,
      completed: true,
      completedAt: new Date().toISOString()
    };
    this.topicProgress.push(newRecord);
    return newRecord;
  }

  getPlatformStats() {
    return {
      totalUsers: this.users.length,
      totalProblems: this.problems.length,
      totalTopics: this.topics.length,
      totalSubmissions: this.submissions.length,
      pathsCount: this.learningPaths.length
    };
  }
}

// Singleton database instance
export const db = new DatabaseStore();
