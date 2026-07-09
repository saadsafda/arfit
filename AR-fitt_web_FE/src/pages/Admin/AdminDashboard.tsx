import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AdminProvider } from '../../context/adminContext';
import adminAuthService from '../../services/adminAuth.service';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [adminUser, setAdminUser] = useState<any>(null);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = async () => {
    // Use the admin auth service to logout
    await adminAuthService.logout();
    // Redirect to admin login page
    navigate('/admin/login');
  };

  // Check admin authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!adminAuthService.isAdminAuthenticated()) {
        navigate('/admin/login');
        return;
      }

      // Get admin user data
      const userData = adminAuthService.getAdminUser();
      if (userData) {
        setAdminUser(userData);
      } else {
        // Verify token with backend
        const isValid = await adminAuthService.verifyAdminToken();
        if (!isValid) {
          navigate('/admin/login');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AdminProvider>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ARFitt Admin Panel
            </Typography>
            {adminUser && (
              <Typography variant="body1" sx={{ mr: 2 }}>
                {adminUser.email}
              </Typography>
            )}
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="admin management tabs"
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 64,
                    fontSize: '1rem',
                    fontWeight: 600,
                  },
                }}
              >
                <Tab
                  icon={<PeopleIcon />}
                  label="Users"
                  {...a11yProps(0)}
                  sx={{ minHeight: 64 }}
                />
                <Tab
                  icon={<InventoryIcon />}
                  label="Products"
                  {...a11yProps(1)}
                  sx={{ minHeight: 64 }}
                />
                <Tab
                  icon={<CategoryIcon />}
                  label="Categories"
                  {...a11yProps(2)}
                  sx={{ minHeight: 64 }}
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <UserManagement />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <ProductManagement />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <CategoryManagement />
            </TabPanel>
          </Paper>
        </Container>
      </Box>
    </AdminProvider>
  );
};

export default AdminDashboard;
