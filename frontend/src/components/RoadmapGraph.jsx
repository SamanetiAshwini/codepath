import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Lock,
  Unlock,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const RoadmapGraph = ({ topics, completedTopicIds = [], onSelectTopic }) => {
  const completedSet = new Set(completedTopicIds);

  const isUnlocked = (topic, index) => {
    // First topic is always unlocked
    if (index === 0) return true;
    if (!topic.prerequisites || topic.prerequisites.length === 0) return true;
    // Unlocked if all prerequisites are completed OR previous topic is completed
    return topic.prerequisites.every(preId => completedSet.has(preId));
  };

  return (
    <div className="relative py-6">
      {/* Roadmap Path Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => {
          const completed = completedSet.has(topic.id);
          const unlocked = isUnlocked(topic, index);

          return (
            <div
              key={topic.id}
              className={`relative rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                completed
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 shadow-sm'
                  : unlocked
                  ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-800/80 shadow-md hover:shadow-indigo-500/10 hover:border-indigo-400'
                  : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-80'
              }`}
            >
              <div>
                {/* Node Step & Status Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Step {String(index + 1).padStart(2, '0')}
                  </span>

                  {completed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  ) : unlocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                      <Unlock className="w-3.5 h-3.5" />
                      In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                      Locked
                    </span>
                  )}
                </div>

                {/* Topic Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center justify-between">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {topic.description}
                </p>
              </div>

              {/* Node Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between mt-auto">
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  ~{topic.estimated_hours || 6} hours
                </span>

                <Link
                  to={`/learn/${topic.id}`}
                  className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                    unlocked || completed
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300'
                  }`}
                >
                  {completed ? 'Review' : 'Start'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
