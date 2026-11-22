import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { RoadmapGraph } from '../components/RoadmapGraph';
import { Map, CheckCircle2, Lock, Sparkles, Trophy, Clock } from 'lucide-react';

export const Roadmap = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const completedTopics = user?.progress?.completedTopics || [];

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      try {
        const res = await api.getTopics('dsa-path');
        if (res.success) {
          setTopics(res.topics);
        }
      } catch (err) {
        console.error('Failed to load roadmap topics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const totalTopics = topics.length;
  const completedCount = topics.filter(t => completedTopics.includes(t.id)).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Roadmap Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
            <Map className="w-3.5 h-3.5 text-indigo-300" />
            Zero to Placement Ready Roadmap
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            DSA Placement Mastery Journey
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Follow this 15-module structured path designed by senior interviewers. Complete topics sequentially to unlock advanced sections and prepare for coding rounds at top product companies.
          </p>

          {/* Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs">
            <div>
              <span className="text-indigo-300 block mb-0.5">Progress</span>
              <span className="text-xl font-bold">{progressPercent}% Completed</span>
            </div>
            <div>
              <span className="text-indigo-300 block mb-0.5">Finished</span>
              <span className="text-xl font-bold">{completedCount} / {totalTopics} Topics</span>
            </div>
            <div>
              <span className="text-indigo-300 block mb-0.5">Total Curriculum Time</span>
              <span className="text-xl font-bold">~110 Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Roadmap Sequence */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <RoadmapGraph
          topics={topics}
          completedTopicIds={completedTopics}
        />
      )}
    </div>
  );
};
