# ARFitt Admin Panel

A comprehensive admin panel for managing users, products, and categories in the ARFitt application.

## 🚀 Features

### User Management
- View all users in a table format
- Edit user information (name, email, phone, gender, role)
- Delete users
- Role-based access control (user/admin)
- User status indicators (verified, subscribed, scanned)

### Product Management
- View products in table or grid layout
- Create new products with category, brand, price, and description
- Edit existing products
- Delete products
- Support for colors, sizes, and image URLs
- Category association

### Category Management
- View categories in table or grid layout
- Create new categories
- Edit category details
- Delete categories (with product association check)
- Type-based categorization

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/
│   ├── ProtectedAdminRoute.tsx    # Route protection component
│   └── LoadingSpinner.tsx         # Loading component
├── context/
│   └── adminContext.tsx           # Admin state management
├── pages/Admin/
│   ├── AdminDashboard.tsx         # Main dashboard with tabs
│   ├── AdminLogin.tsx             # Admin authentication
│   ├── UserManagement.tsx         # User CRUD operations
│   ├── ProductManagement.tsx      # Product CRUD operations
│   └── CategoryManagement.tsx     # Category CRUD operations
├── services/
│   └── admin.service.ts           # API service layer
└── config/
    └── admin.config.ts            # Configuration settings
```

### State Management
- **Context API**: Centralized state management for admin data
- **Reducer Pattern**: Predictable state updates
- **Real-time Updates**: Immediate UI updates after CRUD operations

### API Integration
- RESTful API endpoints for all operations
- Error handling and user feedback
- Loading states and progress indicators

## 🔐 Authentication & Security

### Admin Access
- Protected routes with authentication checks
- Role-based authorization (admin only)
- Session management with localStorage
- Automatic redirect for unauthorized access

### Demo Credentials
```
Email: admin@arfitt.com
Password: admin123
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- React (v18 or higher)
- Material-UI (v5)
- TypeScript

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

3. **Backend Setup**
   Ensure your backend admin endpoints are running:
   - `/admin/users` - User management
   - `/admin/products` - Product management
   - `/admin/categories` - Category management

4. **Start Development Server**
   ```bash
   npm start
   ```

## 📱 Usage

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Use demo credentials or your admin account
3. Access the dashboard at `/admin/dashboard`

### Navigation
- **Users Tab**: Manage user accounts and roles
- **Products Tab**: Manage inventory items
- **Categories Tab**: Manage product categories

### Operations

#### Creating Items
1. Click the "Add" button in the respective tab
2. Fill in the required information
3. Submit the form

#### Editing Items
1. Click the edit icon (pencil) on any item
2. Modify the information
3. Save changes

#### Deleting Items
1. Click the delete icon (trash) on any item
2. Confirm the deletion

## 🔧 Configuration

### Feature Flags
Edit `src/config/admin.config.ts` to enable/disable features:

```typescript
features: {
  enableUserManagement: true,
  enableProductManagement: true,
  enableCategoryManagement: true,
  enableBulkOperations: false,
  enableExport: false,
}
```

### API Endpoints
Configure API endpoints in the same file:

```typescript
api: {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  endpoints: {
    users: '/admin/users',
    products: '/admin/products',
    categories: '/admin/categories',
  },
}
```

## 🎨 Customization

### Themes
Modify the UI theme in `admin.config.ts`:

```typescript
ui: {
  theme: {
    primary: '#1a237e',
    secondary: '#f50057',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
}
```

### Layout
Adjust layout dimensions:

```typescript
layout: {
  sidebarWidth: 240,
  headerHeight: 64,
  contentPadding: 24,
}
```

## 🚨 Error Handling

### API Errors
- Network errors are displayed as alerts
- Validation errors show field-specific messages
- User-friendly error messages for common issues

### Authentication Errors
- Automatic redirect to login for expired sessions
- Clear error messages for invalid credentials
- Session timeout handling

## 📊 Data Management

### State Persistence
- Admin context maintains data during session
- Real-time updates across all components
- Optimistic UI updates for better UX

### Data Validation
- Form validation for required fields
- Type checking for data integrity
- Server-side validation feedback

## 🔄 API Endpoints

### Users
- `GET /admin/users` - Fetch all users
- `GET /admin/users/:id` - Fetch user by ID
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

### Products
- `GET /admin/products` - Fetch all products
- `GET /admin/products/:id` - Fetch product by ID
- `POST /admin/products` - Create product
- `PUT /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product

### Categories
- `GET /admin/categories` - Fetch all categories
- `GET /admin/categories/:id` - Fetch category by ID
- `POST /admin/categories` - Create category
- `PUT /admin/categories/:id` - Update category
- `DELETE /admin/categories/:id` - Delete category

## 🧪 Testing

### Manual Testing
1. Test all CRUD operations
2. Verify authentication flow
3. Test error scenarios
4. Check responsive design

### Automated Testing
```bash
npm test
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Production Considerations
- Set proper environment variables
- Configure CORS on backend
- Enable HTTPS
- Set up proper authentication

## 📝 Contributing

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Material-UI components consistently
- Maintain component separation

### Adding Features
1. Create new components in appropriate directories
2. Update admin context for new state
3. Add API service methods
4. Update routing if needed
5. Test thoroughly

## 🐛 Troubleshooting

### Common Issues

#### Authentication Problems
- Check localStorage for admin token
- Verify backend admin endpoints
- Check CORS configuration

#### API Errors
- Verify backend server is running
- Check API endpoint URLs
- Verify admin role permissions

#### UI Issues
- Check Material-UI version compatibility
- Verify CSS imports
- Check browser console for errors

## 📚 Additional Resources

- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This admin panel is part of the ARFitt application and follows the same licensing terms.

---

**Note**: This admin panel is designed for internal use by authorized administrators only. Ensure proper security measures are in place before deploying to production.
