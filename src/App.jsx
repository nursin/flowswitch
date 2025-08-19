import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Target, Trophy, Zap, Brain, Settings, Eye, EyeOff, Sparkles, Star, ChevronsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';
import StatsPanel from '@/components/StatsPanel';
import ZoneMode from '@/components/ZoneMode';
import ProjectBreakdown from '@/components/ProjectBreakdown';
import BrainDump from '@/components/BrainDump';
import { addTask, addBrainDumpTasks, completeTask as completeTaskAction, deleteTask as deleteTaskAction, addSubtasks, selectSortedTasks, selectZoneTasks, selectCompletedToday } from '@/store/tasksSlice';
import { addPoints, incrementStreak } from '@/store/statsSlice';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const completedTasks = useSelector(state => state.tasks.completedTasks);
  const { streak, totalPoints } = useSelector(state => state.stats);
  const sortedTasks = useSelector(selectSortedTasks);
  const zoneTasks = useSelector(selectZoneTasks);
  const completedToday = useSelector(selectCompletedToday);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isZoneMode, setIsZoneMode] = useState(false);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showBrainDump, setShowBrainDump] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData));
    setShowTaskForm(false);
    toast({ title: '🎯 Task Added!', description: 'A new challenge awaits!' });
  };

  const handleAddBrainDumpTasks = (taskTitles) => {
    dispatch(addBrainDumpTasks(taskTitles));
    setShowBrainDump(false);
    toast({ title: '🧠 Brain Dump Analyzed!', description: `Successfully added and scored ${taskTitles.length} new tasks.` });
  };

  const handleCompleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const points = Math.floor(task.activationScore / 10) + 10;
    dispatch(addPoints(points));
    dispatch(incrementStreak());
    dispatch(completeTaskAction(taskId));
    const rewards = ['🎉 Hyperfocus activated!', '⚡ You\'re on fire!', '🚀 Momentum building!', '🌟 Task master!', '💪 Unstoppable!', '🎯 Perfect execution!', '✨ Flow state achieved!'];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    toast({ title: randomReward, description: `+${points} points! Streak: ${streak + 1}` });
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTaskAction(taskId));
    toast({ title: 'Task Removed', description: 'Task has been deleted' });
  };

  const handleAddSubtasks = (subtasks) => {
    dispatch(addSubtasks(subtasks));
    setSelectedProject(null);
    toast({ title: '🎯 Project Broken Down!', description: `Added ${subtasks.length} manageable subtasks` });
  };

  const breakdownProject = (task) => setSelectedProject(task);

  const enterZoneMode = () => {
    setIsZoneMode(true);
    toast({ title: '🧠 Zone Mode Activated!', description: 'Focus on your top 3 hyperfocus tasks' });
  };

  const exitZoneMode = () => {
    setIsZoneMode(false);
    toast({ title: 'Zone Mode Deactivated', description: 'Back to full task view' });
  };

  if (isZoneMode) {
    return <ZoneMode tasks={zoneTasks} onComplete={handleCompleteTask} onExit={exitZoneMode} streak={streak} totalPoints={totalPoints} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Helmet>
        <title>Flow Switch - ADHD Task Management</title>
        <meta name="description" content="Revolutionary task management designed specifically for ADHD minds. Create hyperfocus on demand with smart activation scoring." />
        <meta property="og:title" content="Flow Switch - ADHD Task Management" />
        <meta property="og:description" content="Revolutionary task management designed specifically for ADHD minds. Create hyperfocus on demand with smart activation scoring." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Flow Switch</h1>
          </div>
          <p className="text-xl text-purple-200 mb-6">Hyperfocus on demand</p>
          <StatsPanel totalTasks={tasks.length} completedToday={completedToday} streak={streak} totalPoints={totalPoints} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap justify-center gap-4 mb-8">
          <Button onClick={() => setShowTaskForm(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="w-5 h-5 mr-2" /> Add Task
          </Button>
          <Button onClick={() => setShowBrainDump(true)} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <ChevronsDown className="w-5 h-5 mr-2" /> Brain Dump
          </Button>
          <Button onClick={enterZoneMode} disabled={zoneTasks.length === 0} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50">
            <Zap className="w-5 h-5 mr-2" /> Enter Zone Mode
          </Button>
          <Button onClick={() => setShowAllTasks(!showAllTasks)} variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-500/20 px-6 py-3 rounded-xl font-semibold">
            {showAllTasks ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
            {showAllTasks ? 'Hide Glacier' : 'Show All Tasks'}
          </Button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {!showAllTasks && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Top Priority Tasks</h2>
                <div className="flex items-center gap-1 text-purple-300">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Activation Scored</span>
                </div>
              </div>
              <div className="grid gap-4">
                <AnimatePresence>
                  {zoneTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TaskCard task={task} onComplete={handleCompleteTask} onDelete={handleDeleteTask} onBreakdown={breakdownProject} showActivationScore={true} priority={index + 1} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {zoneTasks.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                  <Target className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                  <p className="text-purple-300 text-lg">No tasks yet! Add your first task to get started.</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {showAllTasks && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">All Tasks</h2>
                <span className="text-purple-300 text-sm">({tasks.length} total)</span>
              </div>
              <div className="grid gap-4">
                <AnimatePresence>
                  {sortedTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TaskCard task={task} onComplete={handleCompleteTask} onDelete={handleDeleteTask} onBreakdown={breakdownProject} showActivationScore={true} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {completedTasks.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Recent Wins</h2>
              </div>
              <div className="grid gap-3">
                {completedTasks.slice(-5).reverse().map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{task.title}</h3>
                        <p className="text-green-300 text-sm">
                          Completed {new Date(task.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-300 font-semibold">
                          {Math.floor(task.activationScore / 10) + 10} pts
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

      <AnimatePresence>
        {showTaskForm && <TaskForm onSubmit={handleAddTask} onClose={() => setShowTaskForm(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showBrainDump && <BrainDump onSubmit={handleAddBrainDumpTasks} onClose={() => setShowBrainDump(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedProject && <ProjectBreakdown project={selectedProject} onClose={() => setSelectedProject(null)} onAddSubtasks={handleAddSubtasks} />}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;
