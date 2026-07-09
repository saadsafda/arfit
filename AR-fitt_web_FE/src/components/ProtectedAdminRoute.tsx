import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import adminAuthService from '../services/adminAuth.service';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAdminAuth = async () => {
      try {
        // Check if admin token exists
        if (!adminAuthService.isAdminAuthenticated()) {
          setIsAuthenticated(false);
          setIsVerifying(false);
          return;
        }

        // Verify the admin token with the backend
        const isValid = await adminAuthService.verifyAdminToken();
        setIsAuthenticated(isValid);
      } catch (error) {
        console.error('Admin auth verification failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyAdminAuth();
  }, []);

  // Still verifying authentication
  if (isVerifying) {
    return <div>Verifying admin authentication...</div>;
  }

  // Not authenticated, redirect to admin login
  if (!isAuthenticated) {
    // Clear any stale auth data
    adminAuthService.clearAdminAuth();
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // User is authenticated as admin, render the protected content
  return <>{children}</>;
};

export default ProtectedAdminRoute;
