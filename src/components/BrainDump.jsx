import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronsDown, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BrainDump = ({ onSubmit, onClose }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const taskTitles = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (taskTitles.length === 0) {
      toast({
        title: 'Empty dump!',
        description: 'Please write down some tasks before processing.',
        variant: 'destructive',
      });
      return;
    }

    onSubmit(taskTitles);
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
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-lg border border-purple-500/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Brain Dump</h2>
              <p className="text-gray-400 text-sm">Get it all out. One task per line.</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="- Finish report\n- Call the dentist\n- Buy groceries for the week\n- Plan weekend trip"
            rows={10}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ChevronsDown className="w-5 h-5 mr-2" />
            Process Brain Dump
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrainDump;
