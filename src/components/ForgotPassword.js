import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to initiate password reset
      const response = await axios.post('http://localhost:5000/forgot-password', { email });

      toast.success(response.data.message);
      // Navigate to the reset password page
      navigate(`/reset-password?email=${email}`);
    } catch (error) {
      console.error(error.response?.data?.error || 'Failed to initiate password reset. Please try again.');
      toast.error('Failed to initiate password reset. Please try again.');
    }
  };

  return (
    <div className="background">
      <div className='forgot-password-container'>
      <img src = "/img/logo.png" className="logo" alt="Logo"></img>
        <h2>Forgot Password?</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type='submit'>Reset Password</button>
        </form>
        <p className='register'>
          Remember your password? Login <a href='/login'>here</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
