import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import { FaTrophy, FaSort } from "react-icons/fa";

const CompletedTasks = ({ tasks, onDelete }) => {
  const [sortBy, setSortBy] = useState('date');
  const completedTasks = tasks
    .filter((task) => task.status === "completed")
    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-fluid py-5"
      style={{
        background: 'linear-gradient(135deg, #76b852 0%, #8DC26F 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="container">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-4 p-4 shadow-lg"
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <motion.h2
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="d-flex align-items-center gap-2 text-success"
            >
              <FaTrophy /> Completed Tasks
            </motion.h2>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="btn-group"
            >
              <button 
                className={`btn btn-outline-success btn-sm ${sortBy === 'date' ? 'active' : ''}`}
                onClick={() => setSortBy('date')}
              >
                <FaSort /> Date
              </button>
              <button 
                className={`btn btn-outline-success btn-sm ${sortBy === 'priority' ? 'active' : ''}`}
                onClick={() => setSortBy('priority')}
              >
                <FaSort /> Priority
              </button>
            </motion.div>
          </div>

          {completedTasks.length > 0 ? (
            <motion.div
              layout
              className="row g-4"
            >
              <AnimatePresence>
                {completedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ y: -5 }}
                    className="col-12 col-md-6 col-lg-4"
                  >
                    <TaskCard 
                      task={task}
                      onDelete={onDelete}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-5"
            >
              <h3 className="text-muted">No completed tasks yet</h3>
              <p className="text-muted">Complete some tasks to see them here!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CompletedTasks;