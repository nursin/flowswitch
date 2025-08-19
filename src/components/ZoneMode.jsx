import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Target, Clock, Star, Trophy, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskCard from '@/components/TaskCard';

const ZoneMode = ({ tasks, onComplete, onExit, streak, totalPoints }) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeSpent(time => time + 1);
      }, 1000);
    } else if (!isActive && timeSpent !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeSpent]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = (taskId) => {
    onComplete(taskId);
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    }
    setTimeSpent(0);
    setIsActive(false);
  };

  const currentTask = tasks[currentTaskIndex];

  if (!currentTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 mx-auto w-fit">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Zone Complete! 🎉</h2>
          <p className="text-purple-200 mb-6">You've completed all your priority tasks!</p>
          <Button onClick={onExit} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold">
            Exit Zone Mode
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Zone Mode</h1>
                <p className="text-purple-300 text-sm">Hyperfocus Activated</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold">
                  {currentTaskIndex + 1} of {tasks.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white font-mono">{formatTime(timeSpent)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold">{totalPoints} pts</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-full">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-white font-semibold">{streak} streak</span>
            </div>
            
            <Button onClick={onExit} variant="outline" size="icon" className="border-gray-400 text-gray-300 hover:bg-gray-500/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl font-mono text-white">{formatTime(timeSpent)}</div>
              <Button
                onClick={() => setIsActive(!isActive)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isActive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isActive ? 'Pause' : 'Start'}
              </Button>
            </div>
          </motion.div>

          <motion.div key={currentTask.id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">Current Focus</h2>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">
                  Activation Score: {currentTask.activationScore}/100
                </span>
              </div>
            </div>
            
            <TaskCard
              task={currentTask}
              onComplete={handleComplete}
              onDelete={() => {}}
              onBreakdown={() => {}}
              showActivationScore={true}
            />
          </motion.div>

          {tasks.length > 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Up Next</h3>
              <div className="space-y-3">
                {tasks.slice(currentTaskIndex + 1, currentTaskIndex + 3).map((task, index) => (
                  <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-slate-800/40 border border-slate-600/30 rounded-lg p-4 opacity-60">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{task.title}</h4>
                        <p className="text-sm text-gray-400">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-300 text-xs font-semibold">
                          {task.activationScore}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoneMode;
