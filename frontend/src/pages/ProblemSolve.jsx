import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CodeEditor } from '../components/CodeEditor';
import { AiMentorModal } from '../components/AiMentorModal';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Terminal,
  History,
  Sparkles,
  ChevronLeft,
  ChevronDown,
  Clock,
  Tag,
  Flame,
  ArrowRight
} from 'lucide-react';

export const ProblemSolve = () => {
  const { id } = useParams();
  const { user, refreshUser } = useAuth();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'hints' | 'solution' | 'submissions'
  const [editorTab, setEditorTab] = useState('testcases'); // 'testcases' | 'result'
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [revealedHints, setRevealedHints] = useState({});
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('python');

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await api.getProblemDetail(id);
        if (res.success) {
          setProblem(res.problem);
          if (res.problem.starter_code) {
            setCurrentCode(res.problem.starter_code['python'] || '');
          }
        }
      } catch (err) {
        console.error('Failed to load problem:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  useEffect(() => {
    if (problem && user) {
      api.getSubmissionHistory(problem.id).then(res => {
        if (res.success) setSubmissionHistory(res.submissions);
      }).catch(err => console.error('Failed to load submissions:', err));
    }
  }, [problem, user]);

  const handleRunCode = async (lang, code) => {
    setIsRunning(true);
    setCurrentCode(code);
    setCurrentLanguage(lang);
    try {
      const res = await api.runCode(problem.id, lang, code);
      setExecutionResult(res);
      setEditorTab('result');
    } catch (err) {
      console.error('Run failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async (lang, code) => {
    setIsSubmitting(true);
    setCurrentCode(code);
    setCurrentLanguage(lang);
    try {
      const res = await api.submitCode(problem.id, lang, code);
      setExecutionResult(res);
      setEditorTab('result');

      if (res.status === 'Accepted') {
        // Confetti celebration!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (refreshUser) refreshUser();

        // Refresh submission history
        api.getSubmissionHistory(problem.id).then(histRes => {
          if (histRes.success) setSubmissionHistory(histRes.submissions);
        });
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold">Problem Not Found</h2>
        <Link to="/practice" className="text-indigo-600 font-semibold mt-4 inline-block">
          Return to Practice
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-slate-100/70 dark:bg-slate-950 p-2 sm:p-4">
      {/* Top Problem Navigation Bar */}
      <div className="flex items-center justify-between pb-3 px-2">
        <div className="flex items-center gap-3">
          <Link
            to="/practice"
            className="p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
            title="Back to Problems"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-slate-900 dark:text-slate-100 truncate max-w-[240px] sm:max-w-md">
              {problem.title}
            </h1>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                problem.difficulty === 'Beginner'
                  ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                  : problem.difficulty === 'Easy'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : problem.difficulty === 'Medium'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* AI Mentor Button */}
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/20 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask AI Mentor</span>
        </button>
      </div>

      {/* Main Split Grid (Problem Details Left, Code Editor Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0">
        {/* Left Column: Problem Details & Tabs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          {/* Problem Tabs Navigation */}
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2 pt-1 gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-colors flex items-center gap-1.5 ${
                activeTab === 'description'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Description
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-colors flex items-center gap-1.5 ${
                activeTab === 'hints'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Hints ({problem.hints?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-colors flex items-center gap-1.5 ${
                activeTab === 'solution'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Solution
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-colors flex items-center gap-1.5 ${
                activeTab === 'submissions'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Submissions ({submissionHistory.length})
            </button>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 p-5 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            {activeTab === 'description' && (
              <div className="space-y-6">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2">
                  {problem.topic_tags?.map(t => (
                    <span
                      key={t}
                      className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="text-xs text-slate-400 ml-auto">
                    Acceptance: {problem.acceptance_rate}%
                  </span>
                </div>

                {/* Problem Description */}
                <div className="whitespace-pre-wrap leading-relaxed">
                  {problem.description}
                </div>

                {/* Sample Test Case Examples */}
                {problem.sampleTestCases && problem.sampleTestCases.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Examples
                    </h3>
                    {problem.sampleTestCases.map((tc, idx) => (
                      <div
                        key={tc.id || idx}
                        className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-2 text-xs font-mono"
                      >
                        <p className="font-bold text-slate-600 dark:text-slate-300">
                          Example {idx + 1}:
                        </p>
                        <div className="pl-2 border-l-2 border-indigo-500 space-y-1">
                          <p><span className="text-slate-400 font-semibold">Input:</span> {tc.input}</p>
                          <p><span className="text-emerald-500 font-semibold">Output:</span> {tc.expected_output}</p>
                          {tc.explanation && (
                            <p className="font-sans text-slate-500 text-[11px] pt-1">
                              <span className="font-semibold text-slate-400">Explanation:</span> {tc.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Constraints
                    </h3>
                    <pre className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap border border-slate-200/80 dark:border-slate-800/80">
                      {problem.constraints}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 mb-2">
                  Stuck on this problem? Reveal hints sequentially to guide your algorithmic intuition.
                </p>
                {problem.hints?.map((hint, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleHint(idx)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-indigo-500" />
                        Hint {idx + 1}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          revealedHints[idx] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {revealedHints[idx] && (
                      <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800">
                        {hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                  ⚡ <strong>Interview Tip:</strong> We recommend writing your own working brute-force solution before consulting the full editorial explanation.
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-sans">
                  {problem.solution_explanation}
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-3">
                {submissionHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    No submissions recorded yet for this problem.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {submissionHistory.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          {sub.status === 'Accepted' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className="font-bold">{sub.status}</span>
                          <span className="text-slate-400 uppercase font-mono text-[10px]">
                            {sub.language}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                          <span>{sub.executionTimeMs} ms</span>
                          <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Monaco Code Editor & Test Cases (7 cols) */}
        <div className="lg:col-span-7 h-[680px] lg:h-full">
          <CodeEditor
            problem={problem}
            onRun={handleRunCode}
            onSubmit={handleSubmitCode}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            executionResult={executionResult}
            activeTab={editorTab}
            setActiveTab={setEditorTab}
          />
        </div>
      </div>

      {/* AI Coding Mentor Modal */}
      <AiMentorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        problem={problem}
        currentCode={currentCode}
        language={currentLanguage}
      />
    </div>
  );
};
