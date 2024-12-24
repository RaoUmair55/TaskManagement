import React from 'react';
import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const TaskStats = ({ tasks }) => {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  // Priority distribution
  const highPriority = tasks.filter(task => task.priority === 'danger').length;
  const mediumPriority = tasks.filter(task => task.priority === 'warning').length;
  const lowPriority = tasks.filter(task => task.priority === 'success').length;

  const chartData = {
    labels: ['High Priority', 'Medium Priority', 'Low Priority'],
    datasets: [
      {
        data: [highPriority, mediumPriority, lowPriority],
        backgroundColor: ['#dc3545', '#ffc107', '#198754'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Task Statistics</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Task Overview</h5>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-3">
                  <label>Completion Rate</label>
                  <div className="progress">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionRate}%` }}
                      transition={{ duration: 1 }}
                      className="progress-bar bg-success"
                    >
                      {completionRate.toFixed(1)}%
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <div className="row mt-4">
                <motion.div
                  className="col-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="border rounded p-3 text-center">
                    <h3 className="text-primary">{completedTasks}</h3>
                    <p className="mb-0">Completed Tasks</p>
                  </div>
                </motion.div>

                <motion.div
                  className="col-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="border rounded p-3 text-center">
                    <h3 className="text-warning">{pendingTasks}</h3>
                    <p className="mb-0">Pending Tasks</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <motion.div
            className="card shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title">Priority Distribution</h5>
              <div style={{ height: '300px' }}>
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>

        </div>
          <motion.div
            className="row mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="col-md-4 mb-4">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <h6>Total Tasks</h6>
                  <h2>{totalTasks}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card bg-warning text-white">
                <div className="card-body text-center">
                  <h6>In Progress</h6>
                  <h2>{pendingTasks}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card bg-success text-white">
                <div className="card-body text-center">
                  <h6>Completed Today</h6>
                  <h2>{completedTasks || 0}</h2>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default TaskStats;