// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
      profileInfo: null,
      username: '',
      email: '',
      password: '',
      gender: '',
    });

    const navigate = useNavigate();
  
    const [isEmailValid, setIsEmailValid] = useState(true);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, profileInfo: e.target.files[0] });
    };
  
    const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(e.target.value);
    setIsEmailValid(isValid);
  };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailValid) {
          toast.error('Please enter a valid email address', {
            style: {
            maxWidth: '300px', // Adjust the max-width as needed
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          },
        })
          return;
        }
    
        try {
          toast.dismiss();
            const formDataWithFile = new FormData();
            formDataWithFile.append('profileInfo', formData.profileInfo);
            formDataWithFile.append('username', formData.username);
            formDataWithFile.append('email', formData.email);
            formDataWithFile.append('password', formData.password);
            formDataWithFile.append('gender', formData.gender);
    
            const response = await axios.post('http://localhost:5000/register', formDataWithFile);
            console.log(response); // Log the entire response object
            toast.success(response.data.message);

            navigate('/login')

        } catch (error) {
            console.error(error); // Log the error for further investigation
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };
  
    return (
    <div className="background">
      <div className="register-container">
      <img src = "/img/logo.png" className="logo" alt="Logo"></img>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Profile Picture:</label>
          <input type="file" name="profileInfo" accept="image/*" onChange={handleFileChange} />

          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={(e) => {handleChange(e); handleEmailChange(e);}} />
          {!isEmailValid && <p style={{ color: 'red' }}>Please enter a valid email address</p>}

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="preferNotToSay">Prefer Not to Say</option>
          </select>
          <br />
          <button type="submit">Register</button>
        </form>
  
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
  
        {/* ToastContainer for displaying notifications */}
        <ToastContainer position="top-right" autoClose={5000}/>

     {/*   <ParticleBackground/> */}
      </div>
    </div>
    );
  };
  
  export default Register;
