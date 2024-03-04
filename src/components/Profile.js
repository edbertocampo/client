import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import '../css/Profile.css';

Modal.setAppElement('#root');

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    picture: null,
    username: '',
    email: '',
    gender: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [needsMultipart, setNeedsMultipart] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({
    picture: null,
    username: '',
    email: '',
    gender: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        toast.dismiss();
        const token = localStorage.getItem('token');
        console.log(user);
        console.log('Token:', token);
        

        
        if (!token) {
            console.log('Token not found. Logging out...');
          
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const response = await axios.get('http://localhost:5000/profile');
        
        if (response.status === 200) {
          const userData = response.data.user;

          if (userData) {
            setUser(userData);

            setFormData({
              picture: userData.profileInfo || '',
              username: userData.username || '',
              email: userData.email || '',
              gender: userData.gender || '',
            });
          } else {
            console.error('User data is null or undefined');
          }
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error(error.response.data.error);
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setUpdatedFormData({
      ...updatedFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setUpdatedFormData({
      ...updatedFormData,
      profileInfo: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const updatedForm = new FormData();
    console.log('Form Data:', updatedForm);
  
    // Only append fields that have been modified
    if (updatedFormData.username !== user.username) {
      updatedForm.append('username', updatedFormData.username);
    }
  
    if (updatedFormData.gender !== user.gender) {
      updatedForm.append('gender', updatedFormData.gender);
    }
  
    if (updatedFormData.profileInfo) {
      updatedForm.append('profileInfo', updatedFormData.profileInfo);
    }
  
    try {
      const response = await axios.patch('http://localhost:5000/update-profile', updatedForm, {
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      setUser(response.data.user);
      closeModal(); 
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    setNeedsMultipart(true);
    setEditing(true);
    setUpdatedFormData({ ...user, picture: null });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setNeedsMultipart(false);
    setEditing(false);
    setUpdatedFormData({});
  };

  const handleLogout = () => {

    const confirmLogout = window.confirm('Are you sure you want to log out?');
  
    if (confirmLogout) {
     
      localStorage.removeItem('token');
      
      navigate('/login');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDeletion = window.confirm('Are you sure you want to delete your account? This action is irreversible.');

    if (confirmDeletion) {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);


            if (!token) {
                console.log('Token not found. Logging out...');

                localStorage.removeItem('token');
                navigate('/login');
                return;
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const response = await axios.delete('http://localhost:5000/delete-account');

            if (response.status === 200) {
                console.log('Account deleted successfully');

                toast.success('Account deleted successfully')
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error(error.response.data.error);

  
            if (error.response && error.response.status === 401) {
                console.log('Token expired. Logging out...');
    
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }
};

  return (
    <div className='background'>
    <div className='profile-container'>
      <h2 className='profile'>Profile</h2>
      {user && (
        <div className='profile-info'>     
            <img 
              src={`http://localhost:5000${user.profileImageUrl}`}
              alt="Profile"
            />
          <h2>Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
        </div>
      )}
    
      <div className="btn-container">
      <div className="btn1">
      <button onClick={openModal}>
      <FontAwesomeIcon icon={faPenToSquare} className="edit"/>
        Edit Profile
      </button>
      </div>
      <div className='btn2'>
      <button onClick={handleLogout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="logout"/>
        Logout
        </button>
      <button onClick={handleDeleteAccount} > 
      <FontAwesomeIcon icon={faTrash}  className="delete"/>
        Delete Account
        </button>
      </div>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Profile Modal"
      >
        <h2 className='edit_profile'>Edit Profile</h2>
        <form encType={needsMultipart ? 'multipart/form-data' : 'application/x-www-form-urlencoded'} onSubmit={handleSubmit}>
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profileInfo"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={updatedFormData.username || ''}
            onChange={handleChange}
          />
          <label>Gender:</label>
          <select
            name="gender"
            value={updatedFormData.gender || ''}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="preferNotToSay">Prefer not to say</option>
          </select>

          <div className='modal_button'>
          <button type='submit'>Save</button>
          <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
    </div>
  );
};

export default Profile;
