import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Clock, Users, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const TaskForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'medium',
    interest: 'medium',
    novelty: 'medium',
    hasCompetition: false,
    estimatedTime: '15',
    category: 'personal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: 'Oops!',
        description: 'Please add a task title',
        variant: 'destructive'
      });
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-md border border-purple-500/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New Task</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add more details..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Activation Factors */}
          <div className="grid grid-cols-2 gap-4">
            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Urgency
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => handleChange('urgency', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Interest */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Interest
              </label>
              <select
                value={formData.interest}
                onChange={(e) => handleChange('interest', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Novelty */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Novelty
              </label>
              <select
                value={formData.novelty}
                onChange={(e) => handleChange('novelty', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-2">
                Time (min)
              </label>
              <select
                value={formData.estimatedTime}
                onChange={(e) => handleChange('estimatedTime', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="5">5 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>

          {/* Competition Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Social/Competition</p>
                <p className="text-gray-400 text-sm">Involves others or competition</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleChange('hasCompetition', !formData.hasCompetition)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.hasCompetition ? 'bg-purple-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.hasCompetition ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="health">Health</option>
              <option value="learning">Learning</option>
              <option value="creative">Creative</option>
              <option value="social">Social</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Target className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskForm;
