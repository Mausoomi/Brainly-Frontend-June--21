import React, { useState } from 'react';

const SignOutPage = () => {
    const navigate = useState()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 6;
    if (formData.username.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        username: 'Please enter a username'
      }));
      formValid = false;
    }

    if (formData.email.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        email: 'Please enter an email address'
      }));
      formValid = false;
    } else if (!emailRegex.test(formData.email)) {
      setErrors(prevState => ({
        ...prevState,
        email: 'Please enter a valid email address'
      }));
      formValid = false;
    }

    if (formData.password.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        password: 'Please enter a password'
      }));
      formValid = false;
    } else if (formData.password.trim().length < minPasswordLength) {
      setErrors(prevState => ({
        ...prevState,
        password: `Password must be at least ${minPasswordLength} characters long`
      }));
      formValid = false;
    }

    if (formData.confirmPassword.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Please confirm your password'
      }));
      formValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      setErrors(prevState => ({
        ...prevState,
        confirmPassword: 'Passwords do not match'
      }));
      formValid = false;
    }

    if (formValid) {
      // Here you can handle form submission, e.g., sending data to server
      // console.log(formData);
      navigate("/ScienceFictionStories")
      // Reset form after submission
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form >
        <div className='flex flex-col justify-center items-center' >
          <label htmlFor="username" className='text-white'>Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            // required 
          />
          {errors.username && <p className='text-white' >{errors.username}</p>}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor="email" className='text-white'>Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            // required 
          />
          {errors.email && <p className='text-white' >{errors.email}</p>}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor="password" className='text-white'>Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            // required 
          />
          {errors.password && <p className='text-white'>{errors.password}</p>}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor="confirmPassword" className='text-white'>Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 

            // required 
          />
          {errors.confirmPassword && <p className='text-white'>{errors.confirmPassword}</p>}
        </div>
      </form>
      <button className='text-white' onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default SignInPage;
