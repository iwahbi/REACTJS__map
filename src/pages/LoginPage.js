import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from './api';
import './styles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      localStorage.setItem('token', response.token);
      history.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      // Handle login error, display a message to the user, etc.
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Login Page</h1>
      </header>
      <form>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
