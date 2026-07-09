export const adminConfig = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    endpoints: {
      users: '/admin/users',
      products: '/admin/products',
      categories: '/admin/categories',
    },
  },
  
  // Admin Panel Configuration
  panel: {
    title: 'ARFitt Admin Panel',
    version: '1.0.0',
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  
  // Authentication Configuration
  auth: {
    tokenKey: 'adminToken',
    userKey: 'adminUser',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
  
  // Feature Flags
  features: {
    enableUserManagement: true,
    enableProductManagement: true,
    enableCategoryManagement: true,
    enableBulkOperations: false,
    enableExport: false,
  },
  
  // UI Configuration
  ui: {
    theme: {
      primary: '#1a237e',
      secondary: '#f50057',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
    },
    layout: {
      sidebarWidth: 240,
      headerHeight: 64,
      contentPadding: 24,
    },
  },
};

export default adminConfig;
