import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import {
  Terminal,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Tag
} from 'lucide-react';

export const Practice = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [problems, setProblems] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialDifficulty = searchParams.get('difficulty') || 'All';
  const initialTopic = searchParams.get('topicId') || '';
  const initialSearch = searchParams.get('search') || '';

  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.getTopics('dsa-path');
        if (res.success) setTopics(res.topics);
      } catch (err) {
        console.error('Failed to load topics for filter:', err);
      }
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const res = await api.getProblems({
          difficulty: difficulty !== 'All' ? difficulty : undefined,
          topicId: selectedTopic || undefined,
          search: searchQuery || undefined
        });
        if (res.success) {
          setProblems(res.problems);
        }
      } catch (err) {
        console.error('Failed to load problems:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();

    // Sync query params
    const params = {};
    if (difficulty !== 'All') params.difficulty = difficulty;
    if (selectedTopic) params.topicId = selectedTopic;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  }, [difficulty, selectedTopic, searchQuery]);

  const difficulties = ['All', 'Beginner', 'Easy', 'Medium', 'Hard'];

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-900';
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-900';
      case 'Hard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Coding Practice Problems
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Solve curated algorithmic challenges with test case execution and AI mentor guidance.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900 self-start md:self-auto">
          <Terminal className="w-4 h-4" />
          <span>{problems.length} Challenges Available</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems by name, tag, or description..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Topic Dropdown Filter */}
          <div className="w-full md:w-64">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Difficulty Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            Difficulty:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                difficulty === diff
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List Table / Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : problems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <Terminal className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Problems Found</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting your filters or search term.</p>
          <button
            onClick={() => {
              setDifficulty('All');
              setSelectedTopic('');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {problems.map((p, idx) => (
              <div
                key={p.id}
                className="p-5 sm:px-6 hover:bg-slate-50/80 dark:hover:bg-slate-850/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 min-w-[28px]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <Link
                      to={`/solve/${p.id}`}
                      className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                    >
                      {p.title}
                    </Link>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(
                        p.difficulty
                      )}`}
                    >
                      {p.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 pl-10">
                    {p.descriptionSnippet}
                  </p>

                  {/* Topic Tags */}
                  {p.topicTags && p.topicTags.length > 0 && (
                    <div className="flex items-center gap-1.5 pl-10 pt-1 flex-wrap">
                      {p.topicTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pl-10 sm:pl-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-mono">
                      {p.acceptanceRate}%
                    </span>
                    <span className="text-[10px] text-slate-400">Acceptance</span>
                  </div>

                  <Link
                    to={`/solve/${p.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    Solve
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
