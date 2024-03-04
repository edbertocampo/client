// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    // Change the title and favicon when the component mounts
    document.title = 'CRUD';
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = '/img/favicon.ico';
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>

      {/* ToastContainer with custom options */}
      <ToastContainer
        position="top-right"  
        autoClose={5000}     
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ErrorBoundary>
  );
}

export default App;
