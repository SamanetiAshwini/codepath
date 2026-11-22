import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import {
  Code2,
  Terminal,
  Layers,
  ArrowRight,
  Search,
  CheckCircle2,
  Sparkles,
  Cpu,
  Trophy,
  Users,
  Flame,
  Zap,
  BookOpen
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState([]);
  const [paths, setPaths] = useState([]);
  const [stats, setStats] = useState({
    totalProblems: 50,
    totalTopics: 15,
    activeLearners: '12,500+',
    placementRate: '94.2%'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pathsRes, topicsRes] = await Promise.all([
          api.getPaths(),
          api.getTopics('dsa-path')
        ]);
        if (pathsRes.success) setPaths(pathsRes.paths);
        if (topicsRes.success) setTopics(topicsRes.topics);
      } catch (err) {
        console.error('Failed to load home page content:', err);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/practice?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularDsaTopics = topics.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Learn. Practice. Solve. Get Placement Ready.
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-slate-100 max-w-4xl mx-auto leading-[1.1]">
            From <span className="text-indigo-600 dark:text-indigo-400">Zero</span> to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Coding Hero
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The structured programming education and interview practice platform designed to take you from foundational syntax to cracking top tech campus placements and off-campus coding rounds.
          </p>

          {/* Topic Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center shadow-lg shadow-indigo-500/5 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programming topics (e.g. 'Dynamic Programming', 'Binary Search', 'Linked List')..."
                className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/learn"
              className="px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/practice"
              className="px-7 py-3.5 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-sm flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-indigo-500" />
              Explore Problems
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Platform Statistics */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                {stats.totalProblems}+
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Interview Problems
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">
                {stats.totalTopics}
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Structured DSA Modules
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                {stats.placementRate}
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Placement Readiness
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-1">
                {stats.activeLearners}
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Students Practicing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Programming Paths Preview (Python, Java, C++, DSA) */}
      <section className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
              Structured Curriculum
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
              Choose Your Learning Track
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Learn fundamental syntax, object-oriented principles, and the standard collections required for interview online tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paths.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {p.total_topics} Modules
                  </span>
                  <Link
                    to="/learn"
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:gap-1.5 transition-all"
                  >
                    Explore Track <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular DSA Topics */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                Campus Drive Favorites
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Popular DSA Interview Topics
              </h3>
            </div>
            <Link
              to="/roadmap"
              className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 hover:gap-2 transition-all"
            >
              View Full 15-Topic Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularDsaTopics.map((topic, idx) => (
              <div
                key={topic.id}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      Module {idx + 1}
                    </span>
                    <span className="text-xs text-slate-400">~{topic.estimated_hours}h study</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {topic.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  <Link
                    to={`/learn/${topic.id}`}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                  >
                    Study Concept
                  </Link>
                  <Link
                    to={`/practice?topicId=${topic.id}`}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"
                  >
                    Solve Questions <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Placement Ready CTA */}
      <section className="py-16 bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Ready to Ace Your Technical Interviews?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Join thousands of university students and software engineering aspirants leveling up their DSA fundamentals and code execution skills on CodePath.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-2xl bg-white text-indigo-700 font-extrabold text-sm hover:bg-slate-100 shadow-xl transition-all hover:scale-105"
            >
              Create Free Student Account
            </Link>
            <Link
              to="/roadmap"
              className="px-8 py-3.5 rounded-2xl bg-indigo-800/60 border border-indigo-400/40 text-white font-bold text-sm hover:bg-indigo-800 transition-all"
            >
              Explore Full Roadmap
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
