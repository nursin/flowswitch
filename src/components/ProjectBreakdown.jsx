import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Scissors, Plus, Trash2, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ProjectBreakdown = ({ project, onClose, onAddSubtasks }) => {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    
    const subtask = {
      title: newSubtask,
      description: `Part of: ${project.title}`,
      urgency: project.urgency,
      interest: project.interest,
      novelty: 'medium',
      hasCompetition: project.hasCompetition,
      estimatedTime: '15',
      category: project.category
    };
    
    setSubtasks(prev => [...prev, subtask]);
    setNewSubtask('');
  };

  const removeSubtask = (index) => {
    setSubtasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (subtasks.length === 0) {
      toast({
        title: 'No subtasks created',
        description: 'Add at least one subtask to break down the project',
        variant: 'destructive'
      });
      return;
    }
    onAddSubtasks(subtasks);
  };

  const getSuggestedSubtasks = (projectTitle) => {
    const suggestions = [
      `Open the document/app for "${projectTitle}"`,
      'Read the first paragraph/section',
      'Make a quick outline or list',
      'Complete the first small step',
      'Take a 5-minute break and review progress'
    ];
    return suggestions;
  };

  const addSuggestedSubtask = (suggestion) => {
    const subtask = {
      title: suggestion,
      description: `Part of: ${project.title}`,
      urgency: project.urgency,
      interest: project.interest,
      novelty: 'medium',
      hasCompetition: project.hasCompetition,
      estimatedTime: '15',
      category: project.category
    };
    setSubtasks(prev => [...prev, subtask]);
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
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-2xl border border-purple-500/20 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Break Down Project</h2>
              <p className="text-gray-400 text-sm">Make it manageable for your ADHD brain</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-white mb-2">Original Project:</h3>
          <p className="text-purple-200">{project.title}</p>
          {project.description && (<p className="text-purple-300 text-sm mt-1">{project.description}</p>)}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="font-semibold text-white">ADHD-Friendly Suggestions</h3>
          </div>
          <div className="grid gap-2">
            {getSuggestedSubtasks(project.title).map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => addSuggestedSubtask(suggestion)}
                className="text-left p-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-white transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{suggestion}</span>
                  <Plus className="w-4 h-4 text-green-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3">Add Custom Subtask</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Enter a small, specific task..."
              className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
            />
            <Button
              onClick={addSubtask}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-4"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {subtasks.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-white mb-3">
              Created Subtasks ({subtasks.length})
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {subtasks.map((subtask, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-slate-700/50 border border-slate-600 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{subtask.title}</p>
                    <p className="text-gray-400 text-sm">{subtask.description}</p>
                  </div>
                  <Button
                    onClick={() => removeSubtask(index)}
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={subtasks.length === 0}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            <Target className="w-5 h-5 mr-2" />
            Create {subtasks.length} Subtasks
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-400 text-gray-300 hover:bg-gray-500/20 px-6"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectBreakdown;
