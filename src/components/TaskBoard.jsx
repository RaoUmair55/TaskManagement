import  { useState } from "react";
import TaskCard from "./TaskCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TaskBoard = ({ tasks, onUpdate, onDelete, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const tasksPerPage = 6;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);



  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const getCurrentTasks = () => {
    const start = currentPage * tasksPerPage;
    const end = start + tasksPerPage;
    return tasks.slice(start, end);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-fluid py-5"
      style={{
        background: 'linear-gradient(120deg,rgb(101, 236, 246) 0%,rgb(221, 155, 137) 100%)',
        minHeight: '100vh'
      }}
    >
      <motion.div
        initial={{ y: -20 }}s
        animate={{ y: 0 }}
        className="container bg-white rounded-4 shadow-lg p-4"
        style={{ maxWidth: '1200px' }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">Task Board</h2>
        
        <div className="position-relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="row g-4 px-3"
            >
              {getCurrentTasks().map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="col-12 col-md-6 col-lg-4"
                >
                  <TaskCard
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onComplete={onComplete}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {tasks.length > tasksPerPage && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-light position-absolute top-50 start-0 translate-middle-y rounded-circle p-3 shadow-sm"
                onClick={prevPage}
                disabled={currentPage === 0}
                style={{ zIndex: 2 }}
              >
                <FaChevronLeft className="text-primary" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-light position-absolute top-50 end-0 translate-middle-y rounded-circle p-3 shadow-sm"
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                style={{ zIndex: 2 }}
              >
                <FaChevronRight className="text-primary" />
              </motion.button>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="d-flex justify-content-center mt-4 gap-2"
              >
                {[...Array(totalPages)].map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`btn ${
                      currentPage === index 
                        ? 'btn-primary shadow-sm' 
                        : 'btn-outline-primary'
                    } rounded-circle`}
                    style={{ width: '40px', height: '40px' }}
                    onClick={() => setCurrentPage(index)}
                  >
                    {index + 1}
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskBoard;