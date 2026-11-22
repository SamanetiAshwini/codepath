const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('codepath_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // --- Auth & Profile ---
  async register(data) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // --- Learning Paths & Topics ---
  async getPaths() {
    const res = await fetch(`${API_BASE}/topics/paths`);
    return res.json();
  },

  async getTopics(pathId = '') {
    const url = pathId ? `${API_BASE}/topics?pathId=${pathId}` : `${API_BASE}/topics`;
    const res = await fetch(url);
    return res.json();
  },

  async getTopicDetail(id) {
    const res = await fetch(`${API_BASE}/topics/${id}`);
    return res.json();
  },

  // --- Problems ---
  async getProblems(params = {}) {
    const query = new URLSearchParams();
    if (params.difficulty && params.difficulty !== 'All') query.append('difficulty', params.difficulty);
    if (params.topicId) query.append('topicId', params.topicId);
    if (params.search) query.append('search', params.search);
    if (params.tag) query.append('tag', params.tag);

    const res = await fetch(`${API_BASE}/problems?${query.toString()}`);
    return res.json();
  },

  async getProblemDetail(id) {
    const res = await fetch(`${API_BASE}/problems/${id}`);
    return res.json();
  },

  // --- Submissions & Code Execution ---
  async runCode(problemId, language, code) {
    const res = await fetch(`${API_BASE}/submissions/run`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ problemId, language, code })
    });
    return res.json();
  },

  async submitCode(problemId, language, code) {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ problemId, language, code })
    });
    return res.json();
  },

  async getSubmissionHistory(problemId = '') {
    const url = problemId
      ? `${API_BASE}/submissions/history?problemId=${problemId}`
      : `${API_BASE}/submissions/history`;
    const res = await fetch(url, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // --- Progress ---
  async getProgress() {
    const res = await fetch(`${API_BASE}/progress`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async completeTopic(topicId) {
    const res = await fetch(`${API_BASE}/progress/complete-topic`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ topicId })
    });
    return res.json();
  },

  async getLeaderboard() {
    const res = await fetch(`${API_BASE}/progress/leaderboard`);
    return res.json();
  },

  // --- AI Mentor ---
  async askMentor({ problemId, userCode, language, promptType, question }) {
    const res = await fetch(`${API_BASE}/ai/ask`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ problemId, userCode, language, promptType, question })
    });
    return res.json();
  },

  // --- Admin ---
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createProblem(data) {
    const res = await fetch(`${API_BASE}/admin/problems`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async updateProblem(id, data) {
    const res = await fetch(`${API_BASE}/admin/problems/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteProblem(id) {
    const res = await fetch(`${API_BASE}/admin/problems/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};
