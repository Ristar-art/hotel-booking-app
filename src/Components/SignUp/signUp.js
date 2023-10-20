import React, { useState } from 'react';
import './signUp.css';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  setLoading,
  setError,
  clearError,
  clearForm,
} from './singUpSlice';
// Import Firebase-related code (e.g., userCredential) if needed.

function SignUp() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.signUp);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const validationSchema = yup.object().shape({
    name: yup.string().required('Username is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
  
    try {
      // Replace 'userCredential' with the actual Firebase userCredential if needed
      // const userCredential = await someFirebaseAuthFunction();
  
      const response = await fetch('http://localhost:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      
      if (response.ok) {
        console.log('User registered successfully');
        dispatch(setLoading(false));
        dispatch(clearError());
        dispatch(clearForm());
      } else {
        const errorData = await response.json();
        dispatch(setLoading(false));
        dispatch(setError(errorData.error));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      dispatch(setLoading(false));
      dispatch(
        setError('An error occurred while registering. Please try again later.')
      );
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="about-container signUp-body">
      <form onSubmit={handleSubmit} className="about-section">
        <div className="about-intro">
          <h1>User Registration</h1>
          <p>Please fill in the required information to register</p>
        </div>
        <input
          className="signup-input"
          placeholder="Username"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          className="signup-input"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          className="signup-input"
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input
          className="signup-input"
          placeholder="Repeat Password"
          name="passwordRepeat"
          type="password"
          value={formData.passwordRepeat}
          onChange={handleChange}
        />
        <br />
        <div className="about-section">
          {!isLoading ? (
            <button className="signup-button" type="submit">
              Register
            </button>
          ) : (
            <button className="signup-button" type="submit" disabled>
              Loading...
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
