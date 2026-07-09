import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import adminAuthService from '../../services/adminAuth.service';


const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("first");
      console.log(formData);
      // Use the new admin authentication service
      const response = await adminAuthService.login(
        formData.email,
        formData.password
      );

      console.log("response");
      console.log(response);

      console.log('Admin login response in component:', response); // Debug log

      if (response.status === 'success') {
        console.log("response.status success");
        console.log(response.status);
        // Admin authentication successful
        // Tokens are automatically stored by the service
        console.log('Admin login successful, redirecting to dashboard...'); // Debug log
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        console.log("response.status not success");
        console.log(response.status);
        console.log('Admin login failed - status not success:', response); // Debug log
        setError('Login failed. Invalid admin credentials.');
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      console.log('Error response:', error.response?.data); // Debug log
      
      // Check if it's an authentication error
      if (error.response?.status === 401) {
        setError('Invalid admin credentials.');
      } else if (error.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError(error.response?.data?.message || 'Admin login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        py={4}
      >
        <Card sx={{ width: '100%', maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                ARFitt Admin
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to access the admin panel
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                autoComplete="email"
                autoFocus
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                required
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </form>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                Demo Admin Credentials:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: admin@arfitt.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Password: admin123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminLogin;
