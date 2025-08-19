import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Scissors, Clock, Users, Lightbulb, Zap, Star, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TaskCard = ({ task, onComplete, onDelete, onBreakdown, showActivationScore, priority }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getInterestColor = (interest) => {
    switch (interest) {
      case 'high': return 'text-purple-400';
      case 'medium': return 'text-blue-400';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'work': return '💼';
      case 'personal': return '🏠';
      case 'health': return '💪';
      case 'learning': return '📚';
      case 'creative': return '🎨';
      case 'social': return '👥';
      default: return '📝';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {priority && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white">
                <Target className="w-3 h-3" />
                #{priority}
              </div>
            )}
            <span className="text-2xl">{getCategoryEmoji(task.category)}</span>
            <h3 className="text-lg font-semibold text-white">{task.title}</h3>
          </div>
          
          {task.description && (
            <p className="text-gray-300 text-sm mb-3">{task.description}</p>
          )}

          {/* Activation Factors */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(task.urgency)}`}>
              <Clock className="w-3 h-3" />
              {task.urgency} urgency
            </div>
            
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getInterestColor(task.interest)} bg-current/20`}>
              <Lightbulb className="w-3 h-3" />
              {task.interest} interest
            </div>
            
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-cyan-400 bg-cyan-500/20">
              <Zap className="w-3 h-3" />
              {task.novelty} novelty
            </div>
            
            {task.hasCompetition && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-orange-400 bg-orange-500/20">
                <Users className="w-3 h-3" />
                social
              </div>
            )}
            
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-indigo-400 bg-indigo-500/20">
              <Clock className="w-3 h-3" />
              {task.estimatedTime}min
            </div>
          </div>

          {/* Activation Score */}
          {showActivationScore && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 font-bold text-sm">
                  {task.activationScore}/100
                </span>
              </div>
              <span className="text-xs text-gray-400">Activation Score</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => onComplete(task.id)}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          <Check className="w-4 h-4 mr-2" />
          Complete
        </Button>
        
        <Button
          onClick={() => onBreakdown(task)}
          variant="outline"
          className="border-purple-400 text-purple-300 hover:bg-purple-500/20 px-4 py-2 rounded-lg"
        >
          <Scissors className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={() => onDelete(task.id)}
          variant="outline"
          className="border-red-400 text-red-300 hover:bg-red-500/20 px-4 py-2 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
