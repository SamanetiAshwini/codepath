import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';
import {
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  Cpu,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

export const CodeEditor = ({
  problem,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
  executionResult,
  activeTab,
  setActiveTab
}) => {
  const { isDark } = useTheme();
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [copied, setCopied] = useState(false);
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);

  // Update starter code when problem or language changes
  useEffect(() => {
    if (problem && problem.starter_code) {
      const starter = problem.starter_code[language] || '';
      setCode(starter);
    }
  }, [problem, language]);

  const handleResetCode = () => {
    if (problem && problem.starter_code && problem.starter_code[language]) {
      setCode(problem.starter_code[language]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMonacoLanguage = (lang) => {
    switch (lang) {
      case 'python':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
        return 'cpp';
      default:
        return 'python';
    }
  };

  const sampleCases = problem?.sampleTestCases || [];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="python">Python 3</option>
            <option value="java">Java (OpenJDK)</option>
            <option value="cpp">C++ (GCC)</option>
          </select>

          {/* Font size toggle */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
            <button
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
              className="px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Decrease font size"
            >
              A-
            </button>
            <span className="font-mono text-slate-400">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
              className="px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Increase font size"
            >
              A+
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            className="p-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="p-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Run Code Button */}
          <button
            onClick={() => onRun(language, code)}
            disabled={isRunning || isSubmitting}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 text-indigo-500 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>

          {/* Submit Solution Button */}
          <button
            onClick={() => onSubmit(language, code)}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
            {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor Area */}
      <div className="flex-1 min-h-[340px] relative">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(newVal) => setCode(newVal || '')}
          theme={isDark ? 'vs-dark' : 'light'}
          options={{
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            overviewRulerBorder: false,
            padding: { top: 12, bottom: 12 }
          }}
        />
      </div>

      {/* Test Case & Execution Results Panel */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 flex flex-col h-[230px]">
        {/* Panel Tabs */}
        <div className="flex items-center justify-between px-4 pt-2 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('testcases')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors ${
                activeTab === 'testcases'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Test Cases ({sampleCases.length})
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'result'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t-2 border-indigo-600'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Execution Result
              {executionResult && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    executionResult.status === 'Accepted' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}
                />
              )}
            </button>
          </div>

          {executionResult?.executionEnvironment && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <Cpu className="w-3 h-3 text-indigo-500" />
              {executionResult.executionEnvironment}
            </span>
          )}
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'testcases' && (
            <div className="space-y-3">
              {/* Test Case Selector Tabs */}
              <div className="flex items-center gap-2">
                {sampleCases.map((tc, idx) => (
                  <button
                    key={tc.id || idx}
                    onClick={() => setActiveTestCaseIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTestCaseIndex === idx
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>

              {/* Active Test Case Detail */}
              {sampleCases[activeTestCaseIndex] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Input
                    </span>
                    <pre className="font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                      {sampleCases[activeTestCaseIndex].input}
                    </pre>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Expected Output
                    </span>
                    <pre className="font-mono text-emerald-600 dark:text-emerald-400 whitespace-pre-wrap font-semibold">
                      {sampleCases[activeTestCaseIndex].expected_output}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'result' && (
            <div>
              {!executionResult ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs py-6">
                  <Play className="w-6 h-6 mb-2 opacity-40" />
                  <span>Click "Run Code" or "Submit Solution" to inspect test execution results.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Status Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {executionResult.status === 'Accepted' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5" />
                          Accepted
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-sm">
                          <XCircle className="w-5 h-5" />
                          {executionResult.status}
                        </div>
                      )}
                      <span className="text-xs text-slate-500">
                        ({executionResult.passedTestCases} / {executionResult.totalTestCases} test cases passed)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {executionResult.executionTimeMs} ms
                      </span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                        {(executionResult.memoryKb / 1024).toFixed(1)} MB
                      </span>
                    </div>
                  </div>

                  {/* Error Message if any */}
                  {executionResult.errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-mono">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <AlertCircle className="w-4 h-4" />
                        Runtime / Diagnostic Message
                      </div>
                      <p>{executionResult.errorMessage}</p>
                    </div>
                  )}

                  {/* Individual Test Cases Results */}
                  {executionResult.testCaseResults && executionResult.testCaseResults.length > 0 && (
                    <div className="grid grid-cols-1 gap-2">
                      {executionResult.testCaseResults.map((tc, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            {tc.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              Test Case {idx + 1}
                            </span>
                            <span className="font-mono text-slate-400">Input: {tc.input}</span>
                          </div>
                          <div className="flex items-center gap-3 font-mono">
                            <span className="text-slate-500">Expected: {tc.expectedOutput}</span>
                            <span className={tc.passed ? 'text-emerald-500' : 'text-red-500'}>
                              Output: {tc.actualOutput}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
