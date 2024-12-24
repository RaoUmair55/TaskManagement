import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FaPlus, FaCalendar, FaTasks, FaFlag } from 'react-icons/fa';



const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("primary");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      alert("End date must be after start date");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      startDate,
      endDate,
      priority,
      status: "pending",
    };
    onAdd(newTask);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setPriority("primary");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-fluid py-5"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh'
      }}
    >
      <motion.div 
        className="container"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="card shadow-lg border-0"
          whileHover={{ boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
          style={{ borderRadius: '15px' }}
        >
          <div className="card-body p-4">
            <motion.h2 
              className="text-center mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaPlus className="me-2" />
              Add New Task
            </motion.h2>

            <form onSubmit={handleSubmit}>
              <motion.div 
                className="mb-4"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="form-label">
                  <FaTasks className="me-2" />
                  Task Title
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  className="form-control form-control-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </motion.div>

              <div className="row">
                <motion.div 
                  className="col-md-6 mb-4"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="form-label">
                    <FaCalendar className="me-2" />
                    Start Date
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="date"
                    className="form-control form-control-lg"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div 
                  className="col-md-6 mb-4"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="form-label">
                    <FaCalendar className="me-2" />
                    End Date
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="date"
                    className="form-control form-control-lg"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </motion.div>
              </div>

              <motion.div 
                className="mb-4"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="form-label">
                  <FaFlag className="me-2" />
                  Priority
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  className="form-select form-select-lg"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="primary">High</option>
                  <option value="warning">Medium</option>
                  <option value="success">Low</option>
                </motion.select>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="btn btn-primary btn-lg w-100"
                style={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
              >
                <FaPlus className="me-2" />
                Add Task
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AddTask;