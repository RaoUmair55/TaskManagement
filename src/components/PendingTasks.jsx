import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { format } from 'date-fns';

const PendingTasks = ({ tasks, onUpdate, onDelete, onComplete }) => {
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const [deleteId, setDeleteId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mt-4"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-center mb-4"
      >
        Pending Tasks
      </motion.h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {pendingTasks.map((task) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  whileHover={{ backgroundColor: '#f8f9fa' }}
                >
                  <td>{task.title}</td>
                  <td>{format(new Date(task.startDate), 'MMM dd, yyyy')}</td>
                  <td>{format(new Date(task.endDate), 'MMM dd, yyyy')}</td>
                  <td>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`badge bg-${task.priority}`}
                    >
                      {task.priority === 'primary' ? 'High' : 
                       task.priority === 'warning' ? 'Medium' : 'Low'}
                    </motion.span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => onUpdate(task.id)}
                      >
                        <FaEdit />
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-outline-success btn-sm"
                        onClick={() => onComplete(task.id)}
                      >
                        <FaCheck />
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setDeleteId(task.id)}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-50 start-50 translate-middle bg-white p-4 rounded shadow"
            style={{ zIndex: 1000 }}
          >
            <h5>Confirm Delete</h5>
            <p>Are you sure you want to delete this task?</p>
            <div className="d-flex justify-content-end gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-secondary"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-danger"
                onClick={() => {
                  onDelete(deleteId);
                  setDeleteId(null);
                }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PendingTasks;