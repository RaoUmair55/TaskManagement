import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaCheckCircle, FaClock } from "react-icons/fa";
import { format } from "date-fns";

const TaskCard = ({ task, onUpdate, onDelete, onComplete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -5 }}
      className={`card shadow-sm ${task.status === 'completed' ? 'border-success' : ''}`}
    >
      <div className={`card-header d-flex justify-content-between align-items-center bg-${task.priority}`}>
        <h5 className="card-title m-0 text-white">{task.title}</h5>
        {task.status === 'completed' && (
          <FaCheckCircle className="text-white" />
        )}
      </div>

      <div className="card-body">
        <div className="mb-3">
          <small className="text-muted d-flex align-items-center">
            <FaClock className="me-2" />
            {format(new Date(task.startDate), 'MMM dd')} - {format(new Date(task.endDate), 'MMM dd, yyyy')}
          </small>
        </div>

        <div className="d-flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline-primary btn-sm"
            onClick={() => onUpdate(task.id)}
          >
            <FaEdit className="me-1" /> Edit
          </motion.button>

          {task.status !== 'completed' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline-success btn-sm"
              onClick={() => onComplete(task.id)}
            >
              <FaCheckCircle className="me-1" /> Complete
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline-danger btn-sm"
            onClick={() => setShowConfirm(true)}
          >
            <FaTrash className="me-1" /> Delete
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="position-absolute top-50 start-50 translate-middle bg-white p-3 rounded shadow"
            style={{ zIndex: 1000, width: '90%' }}
          >
            <p className="text-center mb-3">Delete this task?</p>
            <div className="d-flex justify-content-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-sm btn-danger"
                onClick={() => {
                  onDelete(task.id);
                  setShowConfirm(false);
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

export default TaskCard;