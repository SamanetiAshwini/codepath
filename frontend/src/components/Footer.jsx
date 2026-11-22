import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Terminal, Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                CodePath
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Learn. Practice. Solve. Get Placement Ready.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              From absolute coding basics to company-grade data structures and algorithms interview preparation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Curriculum
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Python Programming</Link></li>
              <li><Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Java Fundamentals & Collections</Link></li>
              <li><Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">C++ & STL Masterclass</Link></li>
              <li><Link to="/roadmap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Complete 15-Topic DSA Roadmap</Link></li>
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Coding Practice
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/practice?difficulty=Beginner" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Beginner Challenges</Link></li>
              <li><Link to="/practice?difficulty=Easy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Easy Problems</Link></li>
              <li><Link to="/practice?difficulty=Medium" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Medium Interview Questions</Link></li>
              <li><Link to="/practice?difficulty=Hard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Hard Placement Problems</Link></li>
            </ul>
          </div>

          {/* Platform & Community */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/roadmap" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Visual Progress Path</Link></li>
              <li><span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium text-xs"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Safe Code Execution Engine</span></li>
              <li><span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium text-xs"><Sparkles className="w-3.5 h-3.5" /> AI Coding Mentor Active</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} CodePath. Designed for placement readiness and software engineering excellence.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-indigo-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-indigo-500 cursor-pointer">Terms of Service</span>
            <span className="hover:text-indigo-500 cursor-pointer">Campus Placements Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
