import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Trophy,
  CheckCircle2,
  Flame,
  Target,
  ArrowRight,
  Clock,
  Sparkles,
  BarChart3,
  Calendar,
  BookOpen
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export const Dashboard = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.getProgress();
        if (res.success) {
          setProgress(res.progress);
        }
      } catch (err) {
        console.error('Failed to load progress:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const totalSolved = progress?.totalSolved || 0;
  const easySolved = progress?.easySolved || 0;
  const mediumSolved = progress?.mediumSolved || 0;
  const hardSolved = progress?.hardSolved || 0;
  const streak = progress?.currentStreak || user?.streak || 0;
  const accuracy = progress?.accuracy || 100;
  const completedTopics = progress?.completedTopics || [];
  const recentSubs = progress?.recentSubmissions || [];
  const recommended = progress?.recommendedTopic || {
    id: 'dsa-arrays',
    title: 'Arrays & Two Pointers',
    description: 'Master foundational array manipulation and contiguous memory techniques.'
  };

  const chartData = [
    { name: 'Easy', value: Math.max(easySolved, 0), color: '#10b981' },
    { name: 'Medium', value: Math.max(mediumSolved, 0), color: '#f59e0b' },
    { name: 'Hard', value: Math.max(hardSolved, 0), color: '#f43f5e' }
  ];

  // If no problems solved yet, add placeholder for visualization
  const hasData = totalSolved > 0;
  const displayChartData = hasData
    ? chartData
    : [{ name: 'Unsolved Target', value: 1, color: '#94a3b8' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Dashboard Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            Placement Preparation Dashboard
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Welcome back, {user?.fullName || user?.username}!
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-indigo-100 max-w-xl">
            You are on a <span className="font-bold text-amber-300">{streak}-day learning streak</span>. Keep practicing to maintain placement readiness!
          </p>
        </div>

        {/* Quick Streak Card */}
        <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/20 flex items-center gap-4 self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg">
            <Flame className="w-7 h-7 fill-slate-900 text-amber-400" />
          </div>
          <div>
            <span className="text-2xl font-black">{streak} Days</span>
            <p className="text-[11px] text-indigo-200 uppercase font-semibold">Active Streak</p>
          </div>
        </div>
      </div>

      {/* Recommended Next Topic Banner */}
      {recommended && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Recommended Next Step
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {recommended.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                {recommended.description}
              </p>
            </div>
          </div>

          <Link
            to={`/learn/${recommended.id}`}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 flex-shrink-0"
          >
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Metrics & Performance Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Solved Questions Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Questions Solved
            </span>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-black text-slate-900 dark:text-slate-100">
                {totalSolved}
              </span>
              <span className="text-xs text-slate-400">challenges</span>
            </div>

            {/* Circular Chart & Difficulty Legend */}
            <div className="flex items-center justify-between">
              <div className="w-32 h-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={displayChartData}
                      innerRadius={36}
                      outerRadius={52}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {displayChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs flex-1 pl-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Easy
                  </span>
                  <span className="font-bold">{easySolved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium
                  </span>
                  <span className="font-bold">{mediumSolved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Hard
                  </span>
                  <span className="font-bold">{hardSolved}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Overall Accuracy</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{accuracy}%</span>
          </div>
        </div>

        {/* Metric 2: Completed Curriculum Topics */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Curriculum Mastery
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-slate-900 dark:text-slate-100">
                {completedTopics.length}
              </span>
              <span className="text-xs text-slate-400">/ 15 DSA Topics</span>
            </div>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {completedTopics.length === 0 ? (
                <p className="text-xs text-slate-400 py-4">No completed topics yet. Start your first lesson!</p>
              ) : (
                completedTopics.map((topId) => (
                  <div
                    key={topId}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="truncate uppercase font-mono text-[11px]">{topId.replace('dsa-', '')}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/roadmap"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-between hover:underline"
            >
              <span>View Full Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Metric 3: Placement Readiness Score */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Placement Readiness Score
            </span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">
                {Math.min(100, Math.round((totalSolved * 5) + (completedTopics.length * 4)))}
              </span>
              <span className="text-xs text-slate-400">/ 100 PTS</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Calculated based on solved problem complexity, continuous streak consistency, and DSA topic completions.
            </p>

            <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900 text-xs text-indigo-800 dark:text-indigo-300">
              💡 Solve <strong>3 more Medium problems</strong> to level up your placement readiness rating!
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              to="/practice"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-between hover:underline"
            >
              <span>Practice More Problems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          Recent Code Submissions
        </h3>

        {recentSubs.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">
            No recent submissions. Head over to the practice section to solve your first challenge!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Status</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Runtime</th>
                  <th className="py-3 px-4 rounded-r-xl">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-bold ${
                          sub.status === 'Accepted' ? 'text-emerald-500' : 'text-red-500'
                        }`}
                      >
                        {sub.status === 'Accepted' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      <Link to={`/solve/${sub.problemId}`} className="hover:text-indigo-600 transition-colors">
                        {sub.problemId.replace('prob-', '').replace(/-/g, ' ')}
                      </Link>
                    </td>
                    <td className="py-3 px-4 uppercase font-mono text-[11px] text-slate-500">
                      {sub.language}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {sub.executionTimeMs} ms
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
