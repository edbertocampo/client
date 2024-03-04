import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import '../css/Login.css'; 

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            localStorage.setItem('token', response.data.token);
            toast.success(`Welcome back, ${formData.username}!`, {
                position: 'top-right',
                autoClose: 2000,
                closeOnClick: false, 
              });


            navigate('/profile'); 
        } catch (error) {

            toast.error('Invalid username or password', {
                position: 'top-right',
                autoClose: 2000,
                closeOnClick: true,
              });
        }
    };

    return (
        <div className="background">
        <div className="login-container">
            <img src = "/img/logo.png" className="logo" alt="Logo"></img>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username"  value={formData.username} onChange={handleChange} />
                <br />
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="false" />

                <p className="forgot">
                <Link to="/forgot-password" className="forgot_pwd">Forgot Password?</Link>
                </p>

                <button type="submit">
                <FontAwesomeIcon icon={faLock} className='login' />
                Login
                </button>
            </form>
            <p className="register">
                Don't have an account? <Link to="/register" className="register_link">Register here</Link>
            </p>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    </div>
    );
};

export default Login;
