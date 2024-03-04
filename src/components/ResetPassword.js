import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const resetToken = new URLSearchParams(location.search).get('resetToken');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {

      toast.dismiss();
      console.log('Reset Password Data:', { email, newPassword });
      // Send a request to the server to reset password
      await axios.post('http://localhost:5000/reset-password', { email, resetToken, newPassword });

      toast.success('Password reset successful. You can now log in with your new password.');

      navigate('/login');
    } catch (error) {
      console.error(error.response?.data?.error || 'Failed to reset password. Please try again.');
      toast.error(error.response?.data?.error ||'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="background">
      <div className='reset-container'>
      <img src = "/img/logo.png" className="logo" alt="Logo"></img>
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            disabled
          />
          <label>New Password:</label>
          <input
            type='password'
            name='newPassword'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

export default ResetPassword;
