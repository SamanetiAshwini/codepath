import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Code2,
  Coffee,
  Cpu,
  Layers,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';

export const Learn = () => {
  const { user } = useAuth();
  const [paths, setPaths] = useState([]);
  const [selectedPathId, setSelectedPathId] = useState('dsa-path');
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const completedTopics = user?.progress?.completedTopics || [];

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const res = await api.getPaths();
        if (res.success && res.paths.length > 0) {
          setPaths(res.paths);
        }
      } catch (err) {
        console.error('Failed to load learning paths:', err);
      }
    };
    fetchPaths();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const res = await api.getTopics(selectedPathId);
        if (res.success) {
          setTopics(res.topics);
        }
      } catch (err) {
        console.error('Failed to load topics for path:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, [selectedPathId]);

  const getPathIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const completedCount = topics.filter(t => completedTopics.includes(t.id)).length;
  const progressPercent = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Programming Learning Modules
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Master core language syntax and company-tested data structures through step-by-step interactive lessons.
        </p>
      </div>

      {/* Learning Path Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {paths.map((p) => {
          const isSelected = p.id === selectedPathId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPathId(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                }`}
              >
                {getPathIcon(p.icon)}
              </div>
              <div>
                <h4 className="text-sm font-bold truncate">{p.title}</h4>
                <p className={`text-xs ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {p.total_topics} Topics
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Track Progress Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Track Completion
            </span>
            <span className="text-xs text-slate-400">
              ({completedCount} of {topics.length} topics finished)
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
            {paths.find(p => p.id === selectedPathId)?.title || 'Curriculum Progress'}
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-80 flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 min-w-[40px]">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Topics Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t, idx) => {
            const isCompleted = completedTopics.includes(t.id);
            return (
              <div
                key={t.id}
                className={`rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-indigo-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Module {idx + 1}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    ~{t.estimated_hours || 4} hours
                  </span>

                  <Link
                    to={`/learn/${t.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    View Lessons
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
