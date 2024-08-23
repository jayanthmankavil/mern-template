import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      setMessage('Login successful');
      setError(false);
      navigate('/hello');
    } catch (err) {
      setError(true);
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage('Error: ' + err.response.data.msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      setMessage(res.data.msg);
      setError(false);
    } catch (err) {
      setError(true);
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage('Error: ' + err.response.data.msg);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {message}
          </Alert>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={login}
        >
          Login
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 1, mb: 2 }}
          onClick={register}
        >
          Register
        </Button>
        {message && !error && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

function HelloWorld() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Hello World
        </Typography>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hello" element={<HelloWorld />} />
      </Routes>
    </Router>
  );
}

export default App;

