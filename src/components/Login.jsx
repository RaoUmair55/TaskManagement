import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login({ email: credentials.email });
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="card shadow-lg border-0"
              style={{ borderRadius: '15px' }}
            >
              <div className="card-body p-5">
                <motion.h2
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="text-center mb-5 text-primary fw-bold"
                >
                  Welcome Back
                </motion.h2>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-primary text-white">
                        <FaUser />
                      </span>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email address"
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-primary text-white">
                        <FaLock />
                      </span>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <FaSignInAlt className="me-2" />
                    )}
                    {isLoading ? 'Logging in...' : 'Login'}
                  </motion.button>

                  <p className="text-center text-muted mt-3">
                    Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;