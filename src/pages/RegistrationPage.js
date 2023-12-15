import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from './api';
import '../style/styles.css';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const history = useHistory();

  const handleRegistration = async () => {
    try {
      const userData = { email, password, username, fullName };
      await registerUser(userData);
      history.push('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle registration error, display a message to the user, etc.
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Registration Page</h1>
      </header>
      <form>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <button onClick={handleRegistration}>Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
