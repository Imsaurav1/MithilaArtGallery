import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const logoin = process.env.REACT_APP_USER_LOGIN;

export default function Login() {
  const [credential, setCredentials] = useState({ password: "", email: "" });
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new login attempt

    try {
      const response = await fetch(logoin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential), // Pass the credential state
      });

      const responseText = await response.text(); // Get the raw response text
      console.log('Raw response:', responseText); // Log the raw response

      try {
        const json = JSON.parse(responseText); // Attempt to parse the JSON

        if (response.ok) {
          // Handle success
          localStorage.setItem('data', JSON.stringify(json)); // Ensure data is in string format
          navigate("/");
        } else {
          // Handle error
          setError(json.message || 'An error occurred during login. Please try again.'); // Display specific error message if available
        }
      } catch (err) {
        console.error('Failed to parse JSON:', err); // Log parsing error
        setError('Invalid server response. Please try again later.');
      }
    } catch (err) {
      console.error('Network error:', err); // Log network error
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div style={{ backgroundImage: 'url("https://img.artpal.com/979782/2-23-7-23-8-13-54m.jpg")', height: '100vh', backgroundSize: 'cover' }}>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={credential.email} 
              onChange={handleChange} 
              aria-describedby="emailHelp" 
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={credential.password} 
              onChange={handleChange} 
            />
          </div>
          {error && <div className="m-3 text-danger">{error}</div>} {/* Display error message */}
          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/SignUP" className="m-3 mx-1 btn btn-danger">If a New User!</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}
