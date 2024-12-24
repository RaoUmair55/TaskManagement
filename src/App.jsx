import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import AddTask from "./components/AddTask";
import CompletedTasks from "./components/CompletedTasks";
import Modal from "./components/Modal";
import PendingTasks from "./components/PendingTasks";
import TaskStats from "./components/TaskStats";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./components/Login";
import InProgressTasks from "./components/InProgressTasks";


const App = () => {
  const [tasks, setTasks] = useState([
    // Example task objects
    { id: 1, title: 'Task 1', startDate: '2023-01-01', endDate: '2023-01-02', priority: 'danger', status: 'pending' },
    { id: 2, title: 'Task 2', startDate: '2023-01-03', endDate: '2023-01-04', priority: 'warning', status: 'pending' },
    { id: 3, title: 'Task 3', startDate: '2023-01-04', endDate: '2023-01-10', priority: 'success', status: 'pending' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);



  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditTask(task);
      setShowModal(true);
    } else {
      console.log("Task not found with id:", id);
    }
  };
  const handleTaskUpdate = (updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      setShowModal(false);
      setEditTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const deleteTask = (id) => {
    //animating the task deletion
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "completed" } : task
      )
    );
  };

  return (

    <AuthProvider>
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Routes>
          <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <TaskBoard
                    tasks={tasks}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                    onComplete={completeTask}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-task"
              element={<AddTask onAdd={addTask} />}
            />
            <Route
              path="/completed-tasks"
              element={
                <ProtectedRoute>
                  <CompletedTasks
                    tasks={tasks}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pending-tasks"
              element={
                <ProtectedRoute>
                <PendingTasks
                  tasks={tasks}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onComplete={completeTask}
                />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task-stats"
              element={
                <ProtectedRoute>
                  <TaskStats tasks={tasks} />
                </ProtectedRoute>
              }
            />
            <Route 
            path="/in-progress-tasks"
            element={
              <ProtectedRoute>
              <InProgressTasks
                tasks={tasks}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            </ProtectedRoute>
            }
            />
          </Routes>
          {showModal && (
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleTaskUpdate({
                  ...editTask,
                  id: editTask.id,
                  title: e.target.title.value,
                  startDate: e.target.startDate.value,
                  endDate: e.target.endDate.value,
                  priority: e.target.priority.value,
                  status: editTask.status
                });
              }}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    name="title"
                    defaultValue={editTask?.title}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="startDate"
                    defaultValue={editTask?.startDate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <input
                    className="form-control"
                    type="date"
                    name="endDate"
                    defaultValue={editTask?.endDate}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    defaultValue={editTask?.priority}
                    required
                  >
                    <option value="danger">High</option>
                    <option value="warning">Medium</option>
                    <option value="success">Low</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Task
                </button>
              </form>
            </Modal>
          )}
        </div>
      </div>
    </Router>
    </AuthProvider>

  );
};



export default App;
