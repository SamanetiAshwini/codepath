import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Code,
  Layers,
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

export const TopicDetail = () => {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const [topic, setTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [completing, setCompleting] = useState(false);

  const isCompleted = user?.progress?.completedTopics?.includes(topic?.id);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.getTopicDetail(id);
        if (res.success) {
          setTopic(res.topic);
          setLessons(res.lessons || []);
          setProblems(res.problems || []);
        }
      } catch (err) {
        console.error('Failed to load topic details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleMarkComplete = async () => {
    if (!topic || isCompleted) return;
    setCompleting(true);
    try {
      const res = await api.completeTopic(topic.id);
      if (res.success) {
        await refreshUser();
      }
    } catch (err) {
      console.error('Failed to mark topic completed:', err);
    } finally {
      setCompleting(false);
    }
  };

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold">Topic Not Found</h2>
        <Link to="/learn" className="text-indigo-600 font-semibold mt-4 inline-block">
          Return to Learning Modules
        </Link>
      </div>
    );
  }

  const activeLesson = lessons[activeLessonIndex] || {
    title: 'Core Concepts & Fundamentals',
    concept_summary: topic.description,
    detailed_content: `### Concept Deep Dive: ${topic.title}\nUnderstanding ${topic.title} is essential for succeeding in technical interview rounds.\nMaster the syntax patterns and spatial relations below.`,
    syntax_example: `// Core syntax pattern for ${topic.title}\n// Focus on optimal complexity constraints and edge conditions`,
    time_complexity: 'O(N) optimal traversal',
    space_complexity: 'O(1) auxiliary space'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/learn"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Curriculum
        </Link>

        {/* Topic Completion Action Button */}
        <button
          onClick={handleMarkComplete}
          disabled={completing || isCompleted}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            isCompleted
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? 'Topic Completed' : completing ? 'Saving...' : 'Mark Topic as Completed'}
        </button>
      </div>

      {/* Topic Title Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Data Structures & Algorithms
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> ~{topic.estimated_hours || 6} hours
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
              {topic.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {topic.description}
            </p>
          </div>

          <Link
            to={`/practice?topicId=${topic.id}`}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all flex items-center gap-1.5"
          >
            <Terminal className="w-4 h-4" />
            Practice {topic.title} Questions ({problems.length})
          </Link>
        </div>
      </div>

      {/* Main Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lesson Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Concept Summary Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              {activeLesson.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
              {activeLesson.concept_summary}
            </p>

            {/* Syntax Example Code Box */}
            <div className="mb-6">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 rounded-t-2xl text-slate-300 text-xs font-mono">
                <span className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-indigo-400" />
                  Syntax Pattern Implementation
                </span>
                <button
                  onClick={() => copyCode(activeLesson.syntax_example)}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm rounded-b-2xl overflow-x-auto border-x border-b border-slate-800 leading-relaxed">
                {activeLesson.syntax_example}
              </pre>
            </div>

            {/* Time & Space Complexity Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Time Complexity
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {activeLesson.time_complexity || 'O(N) Single Pass'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900">
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
                  Space Complexity
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {activeLesson.space_complexity || 'O(1) Auxiliary Space'}
                </p>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {activeLesson.detailed_content}
            </div>
          </div>
        </div>

        {/* Right Column: Practice Problems for this topic */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-between">
              <span>Practice Questions ({problems.length})</span>
              <Terminal className="w-4 h-4 text-indigo-500" />
            </h3>

            {problems.length === 0 ? (
              <p className="text-xs text-slate-400 py-4">No problems attached to this topic yet.</p>
            ) : (
              <div className="space-y-3">
                {problems.map((p) => (
                  <Link
                    key={p.id}
                    to={`/solve/${p.id}`}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all block group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {p.title}
                      </span>
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
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{p.acceptanceRate}% acceptance</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Solve <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
