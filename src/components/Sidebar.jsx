import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "./Sidebar.css";
import { FaTachometerAlt, FaCheck, FaClock, FaPlay, FaPlus, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar bg-primary text-white h-100 p-3 animate__animated animate__fadeInLeft">
      <h2>Task Manager</h2>
      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-2">
          <Link exact to="/" className="nav-link text-white">
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link exact to="/completed-tasks" className="nav-link text-white">
          <FaCheck className="sidebar-icon" /> Completed Tasks
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link exact to="/pending-tasks" className="nav-link text-white">
          <FaClock className="sidebar-icon" /> Pending Tasks 
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link exact to="/in-progress-tasks" className="nav-link text-white">
          <FaPlay className="sidebar-icon" /> In Progress Tasks
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link exact to="/add-task" className="nav-link text-white">
          <FaPlus className="sidebar-icon" /> Add New Tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link exact to="/task-stats" className="nav-link text-white">
          <FaChartBar className="sidebar-icon" /> Task Stats
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
