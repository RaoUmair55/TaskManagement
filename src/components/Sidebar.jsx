import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./Sidebar.css";
import { FaTachometerAlt, FaCheck, FaClock, FaPlay, FaPlus, FaChartBar, FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="toggle-btn btn btn-primary d-md-none"
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1000
        }}
      >
        <FaBars />
      </button>

      <div className={`sidebar bg-primary text-white h-100 p-3 animate__animated ${isOpen ? 'show-sidebar animate__fadeInLeft' : 'hide-sidebar'}`}>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Task Manager</h2>
          {windowWidth < 768 && (
            <button className="btn btn-link text-white" onClick={toggleSidebar}>
              ✕
            </button>
          )}
        </div>

        <ul className="nav flex-column mt-4">
          <li className="nav-item mb-2">
            <Link to="/" className="nav-link text-white">
              <FaTachometerAlt className="sidebar-icon" /> Dashboard 
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/completed-tasks" className="nav-link text-white">
              <FaCheck className="sidebar-icon" /> Completed Tasks
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/pending-tasks" className="nav-link text-white">
              <FaClock className="sidebar-icon" /> Pending Tasks 
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/in-progress-tasks" className="nav-link text-white">
              <FaPlay className="sidebar-icon" /> In Progress Tasks
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/add-task" className="nav-link text-white">
              <FaPlus className="sidebar-icon" /> Add New Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/task-stats" className="nav-link text-white">
              <FaChartBar className="sidebar-icon" /> Task Stats
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;