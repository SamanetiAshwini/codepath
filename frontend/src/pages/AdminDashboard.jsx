import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Terminal,
  Users,
  Layers,
  BookOpen,
  CheckCircle2,
  X,
  Sparkles,
  Trophy
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState('problems'); // 'problems' | 'leaderboard'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state for creating / editing problem
  const [formData, setFormData] = useState({
    title: '',
    topic_id: 'dsa-arrays',
    difficulty: 'Easy',
    description: '',
    constraints: '',
    solution_explanation: '',
    hints: '',
    topic_tags: '',
    sample_input: '',
    sample_output: '',
    sample_explanation: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, probRes, topicsRes, leaderRes] = await Promise.all([
        api.getAdminStats(),
        api.getProblems(),
        api.getTopics('dsa-path'),
        api.getLeaderboard()
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (probRes.success) setProblems(probRes.problems);
      if (topicsRes.success) setTopics(topicsRes.topics);
      if (leaderRes.success) setLeaderboard(leaderRes.leaderboard);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingProblem(null);
    setFormData({
      title: '',
      topic_id: topics[0]?.id || 'dsa-arrays',
      difficulty: 'Easy',
      description: '',
      constraints: '1 <= nums.length <= 10^5',
      solution_explanation: '',
      hints: 'Look for in-place pointer techniques.\nMaintain running frequency.',
      topic_tags: 'Arrays, Two Pointers',
      sample_input: 'nums = [1, 2, 3]',
      sample_output: '6',
      sample_explanation: 'Sum of array elements'
    });
    setIsModalOpen(true);
  };

  const openEditModal = async (problemId) => {
    try {
      const res = await api.getProblemDetail(problemId);
      if (res.success) {
        const p = res.problem;
        setEditingProblem(p);
        setFormData({
          title: p.title,
          topic_id: p.topic_id || 'dsa-arrays',
          difficulty: p.difficulty,
          description: p.description,
          constraints: p.constraints || '',
          solution_explanation: p.solution_explanation || '',
          hints: (p.hints || []).join('\n'),
          topic_tags: (p.topic_tags || []).join(', '),
          sample_input: p.sampleTestCases?.[0]?.input || '',
          sample_output: p.sampleTestCases?.[0]?.expected_output || '',
          sample_explanation: p.sampleTestCases?.[0]?.explanation || ''
        });
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to load problem for edit:', err);
    }
  };

  const handleDeleteProblem = async (problemId) => {
    if (!window.confirm('Are you sure you want to delete this challenge?')) return;
    try {
      const res = await api.deleteProblem(problemId);
      if (res.success) {
        setProblems(prev => prev.filter(p => p.id !== problemId));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      topic_id: formData.topic_id,
      difficulty: formData.difficulty,
      description: formData.description,
      constraints: formData.constraints,
      solution_explanation: formData.solution_explanation,
      hints: formData.hints.split('\n').filter(h => h.trim().length > 0),
      topic_tags: formData.topic_tags.split(',').map(t => t.trim()).filter(Boolean),
      test_cases: [
        {
          input: formData.sample_input,
          expected_output: formData.sample_output,
          is_sample: true,
          explanation: formData.sample_explanation
        }
      ]
    };

    try {
      if (editingProblem) {
        const res = await api.updateProblem(editingProblem.id, payload);
        if (res.success) {
          setIsModalOpen(false);
          fetchData();
        }
      } else {
        const res = await api.createProblem(payload);
        if (res.success) {
          setIsModalOpen(false);
          fetchData();
        }
      }
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-400/20">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            Administrator Control Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Platform Management & Curation
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-purple-200">
            Create, edit, and organize coding problems, review student progress, and monitor placement metrics.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Coding Question
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Problems</span>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stats?.totalProblems || problems.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">DSA Topics</span>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stats?.totalTopics || topics.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Registered Users</span>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stats?.totalUsers || 2}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Submissions</span>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{stats?.totalSubmissions || 1}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
            activeTab === 'problems'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Manage Coding Questions ({problems.length})
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'leaderboard'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          Student Placement Leaderboard ({leaderboard.length})
        </button>
      </div>

      {/* Tab 1: Problems List */}
      {activeTab === 'problems' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Problem Title</th>
                  <th className="py-3.5 px-4">Difficulty</th>
                  <th className="py-3.5 px-4">Topic Tags</th>
                  <th className="py-3.5 px-4">Acceptance</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {problems.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                      {p.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.difficulty === 'Beginner'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                            : p.difficulty === 'Easy'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : p.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {(p.topicTags || []).slice(0, 3).join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {p.acceptanceRate}%
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p.id)}
                        className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                        title="Edit question"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProblem(p.id)}
                        className="p-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">University</th>
                  <th className="py-3.5 px-4">Solved Total</th>
                  <th className="py-3.5 px-4">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {leaderboard.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-[11px] font-bold">
                        {student.username[0].toUpperCase()}
                      </div>
                      <span>{student.fullName || student.username}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {student.college || 'Engineering Institute'}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                      {student.totalSolved} questions
                    </td>
                    <td className="py-3.5 px-4 font-bold text-amber-500">
                      🔥 {student.streak} days
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create / Edit Problem */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {editingProblem ? 'Edit Coding Question' : 'Create New Coding Question'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Problem Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Reverse Linked List"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Difficulty Level *
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    DSA Topic Module *
                  </label>
                  <select
                    value={formData.topic_id}
                    onChange={(e) => setFormData({ ...formData, topic_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {topics.map(t => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Topic Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.topic_tags}
                    onChange={(e) => setFormData({ ...formData, topic_tags: e.target.value })}
                    placeholder="Arrays, Two Pointers, Binary Search"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Problem Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain the problem requirement, input parameters, and expected outcome..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Constraints
                </label>
                <input
                  type="text"
                  value={formData.constraints}
                  onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                  placeholder="1 <= nums.length <= 10^5"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              {/* Sample Test Case Inputs */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="font-bold text-slate-900 dark:text-slate-100 block">Sample Test Case</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-500 block mb-1">Sample Input</label>
                    <input
                      type="text"
                      value={formData.sample_input}
                      onChange={(e) => setFormData({ ...formData, sample_input: e.target.value })}
                      placeholder="nums = [2, 7, 11, 15], target = 9"
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Expected Output</label>
                    <input
                      type="text"
                      value={formData.sample_output}
                      onChange={(e) => setFormData({ ...formData, sample_output: e.target.value })}
                      placeholder="[0, 1]"
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Solution Editorial & Complexities
                </label>
                <textarea
                  rows={3}
                  value={formData.solution_explanation}
                  onChange={(e) => setFormData({ ...formData, solution_explanation: e.target.value })}
                  placeholder="Explain optimal algorithm, time complexity, and space complexity..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Progressive Hints (one per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.hints}
                  onChange={(e) => setFormData({ ...formData, hints: e.target.value })}
                  placeholder="Hint 1: Can you use a hash map?&#10;Hint 2: Target minus current value."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md"
                >
                  {editingProblem ? 'Save Changes' : 'Publish Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
