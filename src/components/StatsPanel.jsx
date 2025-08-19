import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Zap, Star } from 'lucide-react';

const StatsPanel = ({ totalTasks, completedToday, streak, totalPoints }) => {
  const stats = [
    { icon: Target, label: 'Active Tasks', value: totalTasks, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-500/20' },
    { icon: Trophy, label: 'Completed Today', value: completedToday, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/20' },
    { icon: Zap, label: 'Streak', value: streak, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-500/20' },
    { icon: Star, label: 'Total Points', value: totalPoints, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.bgColor} backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center`}
        >
          <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-3`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-gray-300">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsPanel;
