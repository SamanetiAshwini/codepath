import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Sparkles,
  X,
  Send,
  Lightbulb,
  Clock,
  BookOpen,
  Bug,
  Bot,
  User,
  Copy,
  Check
} from 'lucide-react';

export const AiMentorModal = ({ isOpen, onClose, problem, currentCode, language }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hello! I am your **CodePath Placement Mentor**. 
I'm here to help you solve **${problem ? problem.title : 'this coding challenge'}** by guiding your thinking step-by-step.

Feel free to ask for a hint, analyze time/space complexity, or get feedback on your logic!`,
      source: 'CodePath Placement Coach'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isOpen) return null;

  const handleAsk = async (promptType = 'general', customText = null) => {
    const questionText = customText || inputQuestion.trim();
    if (!questionText && promptType === 'general') return;

    const userMessage = {
      role: 'user',
      content: questionText || `Can you provide a ${promptType} for this problem?`
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await api.askMentor({
        problemId: problem?.id,
        userCode: currentCode,
        language: language || 'python',
        promptType,
        question: questionText
      });

      if (res.success) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: res.reply,
            source: res.source
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '⚠️ I had trouble processing that request. Please try again.',
            source: 'System'
          }
        ]);
      }
    } catch (err) {
      console.error('Mentor query error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Unable to reach the mentor service. Please check your network.',
          source: 'System'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl flex flex-col h-[640px] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/40 dark:to-purple-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                CodePath AI Coding Mentor
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                  Pedagogical Mode
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guiding you to optimal solutions without spoiling answers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => handleAsk('hint', 'Give me a subtle hint to get started.')}
            disabled={loading}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 hover:bg-amber-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Get a Hint
          </button>
          <button
            onClick={() => handleAsk('complexity', 'Analyze the time and space complexity required for this problem.')}
            disabled={loading}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            Complexity Breakdown
          </button>
          <button
            onClick={() => handleAsk('explain', 'Can you explain the core algorithmic concept behind this problem?')}
            disabled={loading}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900 hover:bg-purple-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-500" />
            Explain Concept
          </button>
          <button
            onClick={() => handleAsk('bug', 'Review my current code and tell me if there are potential logic bugs or edge cases.')}
            disabled={loading}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Bug className="w-3.5 h-3.5 text-rose-500" />
            Check My Logic
          </button>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {msg.source && (
                  <div className="text-[10px] uppercase font-bold text-indigo-500 dark:text-indigo-400 mb-1 flex items-center justify-between">
                    <span>{msg.source}</span>
                    <button
                      onClick={() => copyResponse(msg.content, idx)}
                      className="text-slate-400 hover:text-slate-200 p-1"
                      title="Copy response"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                )}
                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
                <span>Mentor is analyzing your code and question...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk('general');
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Ask anything (e.g. 'Why does my pointer go out of bounds?')..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputQuestion.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
