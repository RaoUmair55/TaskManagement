import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTrash, FaClock } from 'react-icons/fa';
import './InProgressTask.css';

const InProgressTasks = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const inProgressTasks = tasks.filter(task => task.status === 'pending');

  const handleComplete = (taskId) => {
    onUpdateTask(taskId, { status: 'completed' });
  };

  return (
    <div className="container mt-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        In Progress Tasks
      </motion.h2>

      {inProgressTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="alert alert-info"
        >
          No tasks in progress at the moment.
        </motion.div>
      ) : (
        <div className="row">
          {inProgressTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className="col-md-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`card shadow-sm border-${task.priority}`}>
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className={`badge bg-${task.priority} me-2`}>
                        {task.priority}
                      </span>
                      <span className="text-muted">
                        <FaClock className="me-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="btn-group">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-success btn-sm"
                        onClick={() => handleComplete(task.id)}
                      >
                        <FaCheck /> Complete
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <FaTrash /> Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InProgressTasks;